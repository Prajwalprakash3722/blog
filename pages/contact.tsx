import TrustPage from "../components/trust-page";

export default function Contact() {
  return (
    <TrustPage title="Contact Prajwal" path="/contact" description="Contact Prajwal Prakash about corrections, accessibility, technical articles, speaking, writing, or DevCoffee resources.">
      <p>Email <a className="text-accent-link underline" href="mailto:prajwalprakash3722@gmail.com">prajwalprakash3722@gmail.com</a> for corrections, source questions, accessibility problems, speaking or writing enquiries, and technical discussion related to an article. Include the article URL and a concise description so the message can be understood and answered accurately.</p>
      <p>This is a personal publication, not a support desk or an official channel for Prajwal&apos;s employer. Do not send passwords, API keys, private production data, health records, financial information, or other secrets. Unsolicited marketing and link-exchange requests may not receive a response. Responsible reports about a security issue should describe the affected URL, observable impact, and safe reproduction steps without exploiting readers or accessing data that is not yours.</p>
      <p>You can also find Prajwal on <a className="text-accent-link underline" href="https://github.com/Prajwalprakash3722" rel="noreferrer">GitHub</a> and <a className="text-accent-link underline" href="https://twitter.com/prajwal_3722" rel="noreferrer">X/Twitter</a>. Public feeds and machine-readable resources are listed on the developer resources page.</p>
    </TrustPage>
  );
}
