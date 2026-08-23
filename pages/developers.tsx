import TrustPage from "../components/trust-page";

export default function Developers() {
  return (
    <TrustPage title="DevCoffee developer resources" path="/developers" description="First-party DevCoffee resources for developers and agents: MCP, feeds, sitemap, llms.txt, and open-source projects by Prajwal Prakash.">
      <p>DevCoffee is the publishing identity used by Prajwal Prakash for this blog and related open-source work. This blog has no private customer API and requires no authentication. Its public, read-only developer interfaces are designed for feed readers, search engines, research tools, and AI agents.</p>
      <ul className="list-disc pl-6 space-y-3">
        <li><a className="text-accent-link underline" href="/.well-known/mcp">MCP Streamable HTTP endpoint</a> for discovering and reading published posts.</li>
        <li><a className="text-accent-link underline" href="https://www.npmjs.com/package/@devcoffee/mcp-tools">@devcoffee/mcp-tools on npm</a>, the first-party DevCoffee MCP tools package.</li>
        <li><a className="text-accent-link underline" href="/llms.txt">llms.txt</a> for agent scope and when-to-use guidance.</li>
        <li><a className="text-accent-link underline" href="/sitemap.xml">XML sitemap</a>, <a className="text-accent-link underline" href="/rss.xml">RSS</a>, and <a className="text-accent-link underline" href="/rss.json">JSON feed</a> for discovery and updates.</li>
        <li><a className="text-accent-link underline" href="https://github.com/Prajwalprakash3722">GitHub projects</a> for source code and project-specific issue tracking.</li>
      </ul>
      <p>Clients should cache responses, identify themselves honestly, follow HTTP status codes, and link to the canonical article when quoting or summarizing it. Use MCP for targeted article discovery, RSS for incremental updates, and the sitemap for crawling.</p>
    </TrustPage>
  );
}
