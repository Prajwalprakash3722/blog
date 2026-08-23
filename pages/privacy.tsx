import TrustPage from "../components/trust-page";

export default function Privacy() {
  return (
    <TrustPage title="Privacy policy" path="/privacy" description="Privacy information for readers of Prajwal's Blog, including analytics, infrastructure logs, email, retention, and reader choices.">
      <p>Prajwal&apos;s Blog publishes articles without requiring an account, subscription, or payment. The site does not ask readers to create profiles and does not sell personal information. Standard web infrastructure may process technical request data such as IP address, user agent, requested URL, timestamp, referrer, and coarse location for delivery, abuse prevention, reliability, and aggregate traffic measurement.</p>
      <p>The site is delivered through hosting and content-delivery providers and uses Vercel Analytics and Cloudflare Web Analytics. Those providers may process limited request or device information under their own terms. Email sent through the contact address is processed by the sender&apos;s and recipient&apos;s email providers and retained only as reasonably needed to answer, preserve context, prevent abuse, or meet legal obligations.</p>
      <p>Articles may link to third-party sites whose privacy practices are outside this site&apos;s control. Avoid sending secrets or sensitive personal data through email. To ask a privacy question or request deletion of information you previously sent directly, email the address on the contact page with enough context to identify the relevant message. This policy may change when the site&apos;s services change; the current version is effective 23 August 2026.</p>
    </TrustPage>
  );
}
