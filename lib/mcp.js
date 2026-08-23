const SUPPORTED_PROTOCOL_VERSIONS = [
  "2025-11-25",
  "2025-06-18",
  "2025-03-26",
];

const tools = [
  {
    name: "search_blog",
    title: "Search Prajwal's Blog",
    description:
      "Search published DevCoffee blog posts by words in their title, excerpt, or category.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", minLength: 1 },
        limit: { type: "integer", minimum: 1, maximum: 20, default: 10 },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_blog_post",
    title: "Read a blog post",
    description:
      "Retrieve the original Markdown for a published Prajwal's Blog article by slug.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", minLength: 1 } },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
];

function result(id, value) {
  return { jsonrpc: "2.0", id, result: value };
}

function error(id, code, message) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

function textToolResult(text, isError = false) {
  return { content: [{ type: "text", text }], ...(isError ? { isError: true } : {}) };
}

function handleMcpRequest(message, posts, readPost) {
  if (!message || message.jsonrpc !== "2.0" || typeof message.method !== "string") {
    return { status: 400, body: error(message?.id, -32600, "Invalid Request") };
  }

  if (message.method === "notifications/initialized") {
    return { status: 202, body: null };
  }
  if (message.method === "initialize") {
    const requested = message.params?.protocolVersion;
    const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
      ? requested
      : SUPPORTED_PROTOCOL_VERSIONS[0];
    return {
      status: 200,
      body: result(message.id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: {
          name: "devcoffee-blog",
          title: "Prajwal's Blog — DevCoffee",
          version: "1.0.0",
        },
        instructions:
          "Use this read-only server to find and retrieve Prajwal Prakash's published technical articles and essays. Cite the canonical blog URL returned by the tool.",
      }),
    };
  }
  if (message.method === "ping") {
    return { status: 200, body: result(message.id, {}) };
  }
  if (message.method === "tools/list") {
    return { status: 200, body: result(message.id, { tools }) };
  }
  if (message.method === "tools/call") {
    const name = message.params?.name;
    const args = message.params?.arguments || {};
    if (name === "search_blog") {
      const query = typeof args.query === "string" ? args.query.trim().toLowerCase() : "";
      if (!query) {
        return {
          status: 200,
          body: result(message.id, textToolResult("query must be a non-empty string", true)),
        };
      }
      const requestedLimit = Number.isInteger(args.limit) ? args.limit : 10;
      const limit = Math.min(20, Math.max(1, requestedLimit));
      const matches = posts
        .filter((post) =>
          [post.title, post.excerpt, post.category]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query)
        )
        .slice(0, limit)
        .map(
          (post) =>
            `- ${post.title} — https://blog.devcoffee.me/posts/${encodeURIComponent(post.slug)}`
        );
      return {
        status: 200,
        body: result(
          message.id,
          textToolResult(matches.length ? matches.join("\n") : "No published posts matched.")
        ),
      };
    }
    if (name === "get_blog_post") {
      const slug = typeof args.slug === "string" ? args.slug : "";
      const post = posts.find((candidate) => candidate.slug === slug);
      if (!post) {
        return {
          status: 200,
          body: result(message.id, textToolResult("Published post not found.", true)),
        };
      }
      const markdown = readPost(slug);
      return {
        status: 200,
        body: result(
          message.id,
          textToolResult(
            `Canonical URL: https://blog.devcoffee.me/posts/${encodeURIComponent(slug)}\n\n${markdown}`
          )
        ),
      };
    }
    return { status: 200, body: result(message.id, textToolResult("Unknown tool.", true)) };
  }

  if (message.id === undefined) return { status: 202, body: null };
  return { status: 200, body: error(message.id, -32601, "Method not found") };
}

module.exports = { SUPPORTED_PROTOCOL_VERSIONS, handleMcpRequest, tools };
