/* eslint-disable react/jsx-no-comment-textnodes */
import Link from "next/link";
interface Props {
  totalPostNumber: number;
}
const Intro = ({ totalPostNumber }: Props) => {
  return (
    <section className="flex flex-col items-center justify-center py-20 md:py-32">
      <div className="relative mb-12 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        <h1 className="relative font-extralight tracking-tight text-center text-white text-8xl md:text-9xl lg:text-[10rem] leading-none select-none">
          {/* this converts number to binary string, pun intended ;) */}
          {(totalPostNumber >> 0).toString(2)}
        </h1>
        <p className="absolute -bottom-6 left-0 right-0 text-center text-sm text-gray-500 font-mono tracking-widest uppercase opacity-50">
          Articles Written till now :)
        </p>
      </div>

      <div className="max-w-3xl text-center space-y-8 px-4">
        <article className="text-xl md:text-2xl font-medium leading-relaxed text-gray-400 space-y-6">
          <header>
            Hi <span className="wave inline-block">👋🏻</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">I&apos;m Prajwal</span>. I currently work as an SRE 1 at PhonePe, India. I have a passion for writing about tech, philosophy, life, books, and my travel experiences.
          </header>

          <p>
            My work primarily involves building scalable and reliable systems, When I&apos;m not in the tech zone, I&apos;m probably pushing myself at the gym, on a trip, or experimenting in the kitchen.
          </p>

          <p className="text-center text-gray-500 text-lg">
            Thoughts on tech, philosophy, and books.
          </p>
        </article>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="https://www.devcoffee.me"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#1C2333] text-gray-200 rounded-full hover:bg-[#252b3b] hover:text-white transition-all border border-white/5 hover:border-purple-500/30 flex items-center gap-2"
          >
            About me
          </a>
          <Link
            href="/til"
            className="px-6 py-3 bg-[#1C2333] text-gray-200 rounded-full hover:bg-[#252b3b] hover:text-white transition-all border border-white/5 hover:border-purple-500/30 flex items-center gap-2"
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-blue-400">TIL</span>
          </Link>
          <Link
            href="/travel"
            className="px-6 py-3 bg-[#1C2333] text-gray-200 rounded-full hover:bg-[#252b3b] hover:text-white transition-all border border-white/5 hover:border-purple-500/30 flex items-center gap-2"
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-blue-400">Travel</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Intro;
