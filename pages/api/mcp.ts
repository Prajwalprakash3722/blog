import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getPublishedPosts } from "../../lib/api";
import { handleMcpRequest, SUPPORTED_PROTOCOL_VERSIONS } from "../../lib/mcp";

function readPublishedPost(slug: string) {
  const file = path.join(process.cwd(), "_posts", `${slug}.mdx`);
  return fs.readFileSync(file, "utf8").replace(/^---[\s\S]*?---\s*/, "");
}

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  response.setHeader("Access-Control-Allow-Origin", "https://blog.devcoffee.me");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, MCP-Protocol-Version"
  );
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "OPTIONS") return response.status(204).end();
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    return response.status(405).end();
  }

  const origin = request.headers.origin;
  if (origin && origin !== "https://blog.devcoffee.me") {
    return response.status(403).json({
      jsonrpc: "2.0",
      id: request.body?.id ?? null,
      error: { code: -32000, message: "Forbidden Origin" },
    });
  }
  const accept = request.headers.accept || "";
  if (!accept.includes("application/json") || !accept.includes("text/event-stream")) {
    return response.status(406).json({
      jsonrpc: "2.0",
      id: request.body?.id ?? null,
      error: {
        code: -32000,
        message: "Accept must include application/json and text/event-stream",
      },
    });
  }
  const protocolHeader = request.headers["mcp-protocol-version"];
  if (
    protocolHeader &&
    !SUPPORTED_PROTOCOL_VERSIONS.includes(
      Array.isArray(protocolHeader) ? protocolHeader[0] : protocolHeader
    )
  ) {
    return response.status(400).json({
      jsonrpc: "2.0",
      id: request.body?.id ?? null,
      error: { code: -32000, message: "Unsupported MCP-Protocol-Version" },
    });
  }

  const posts = getPublishedPosts(["slug", "title", "excerpt", "category"]);
  const handled = handleMcpRequest(request.body, posts, readPublishedPost);
  if (!handled.body) return response.status(handled.status).end();
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  return response.status(handled.status).json(handled.body);
}
