import TrustPage from "../components/trust-page";

export default function About() {
  return (
    <TrustPage title="About Prajwal's Blog" path="/about" description="About Prajwal Prakash, DevCoffee, and this personal publication about reliable systems, technology, accessibility, life, books, and travel.">
      <p>Prajwal&apos;s Blog is the personal publishing home of Prajwal Prakash, a site reliability engineer in India. Since 2020, this site has collected practical engineering notes and personal essays about reliable systems, Linux, distributed systems, TypeScript, accessibility, books, philosophy, and travel.</p>
      <p>The technical writing starts from systems Prajwal has operated or studied and aims to make difficult infrastructure concepts understandable without hiding their trade-offs. Personal writing is published as first-person experience rather than universal advice. Every article shows its publication date, category, and approximate reading time, and older writing remains available because learning in public includes showing how ideas change.</p>
      <p>DevCoffee is the publishing identity connecting this blog with Prajwal&apos;s portfolio and open-source work. The site is independently maintained and does not represent Prajwal&apos;s employer. Readers and agents may quote short passages with attribution and a link to the canonical article. For corrections, source questions, or accessibility problems, use the contact page.</p>
    </TrustPage>
  );
}
