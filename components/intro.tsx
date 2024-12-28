/* eslint-disable react/jsx-no-comment-textnodes */
import Link from "next/link";
interface Props {
  totalPostNumber: number;
}
const Intro = ({ totalPostNumber }: Props) => {
  return (
    <section className="flex flex-col min-h-fit items-center justify-center snap-normal my-8">
      <div className="flex flex-row items-center">
        <div className="flex flex-col justify-center text-center">
          <h1 className="font-extralight tracking-[0.20em] text-center text-[#424242] text-7xl md:text-8xl lg:text-9xl  ">
          {/* this converts number to binary string, pun intended ;) */}
            {(totalPostNumber >> 0).toString(2)}
          </h1>
          <p className="text-center text-white font-sans font-light  lg:tracking-[0.40em] lg:-mt-[4.6rem] mb-16 sm: sm:font-normal tracking-widest md:-mt-[3.4rem] md:tracking-[0.23em] -mt-12 ">
            Articles Written till now :)
          </p>
        </div>
      </div>
      <div className="max-w-3xl sm:text-justify">
        <h1 className="text-[24.4px] font-semibold tracking-none leading-[150%] text-gray-400 mb-4 lg:leading-[200%] lg:mb-0">
        Hi <span className="wave">👋🏻</span>{" "}
        <span className="text-[#E8E8FD]">I&apos;m Prajwal</span>. I currently work as an SRE 1 at{" "} PhonePe, India. I have a passion for writing about tech, philosophy, life, books, and my travel experiences. Exploring new places is something I truly enjoy.
        My work primarily involves building scalable and reliable systems. You can check out some of the projects we work on at PhonePe here: <a href="https://phonepe.github.io/" target="_blank" rel="noreferrer">PhonePe GitHub</a> and <a href="https://tech.phonepe.com/" target="_blank" rel="noreferrer">PhonePe Tech Blog</a>.
        Working on such large-scale systems is both interesting and rewarding, you learn new things almost everyday.
        <p className="text-center">Thoughts on tech, philosophy, and books.</p>
        </h1>
      </div>
      <div>
        <div className="grid gap-8 items-start justify-center mt-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button className="relative px-7 py-4 bg-[#1C2333] rounded-lg leading-none flex items-center divide-x divide-gray-600">
              <span className="flex items-center space-x-5">
                <a
                  className="pr-6 text-gray-100 hover:text-indigo-400"
                  href="https://www.devcoffee.me"
                  target="_blank"
                  rel="noreferrer">
                  About me
                </a>
              </span>
              <div className="relative inline-block px-8 py-3 group">
                <span className="text-indigo-400 hover:text-gray-100 transition-opacity duration-200 opacity-0">
                  @prajwal_3722
                </span>
                <span>
                  <ul className="absolute inset-0 flex items-center justify-center space-x-3 transition-opacity opacity-100">
                    <li>
                      <Link
                        className="block transition-opacity rounded-full hover:opacity-90 focus:outline-none focus:opacity-75"
                        href="/til"
                        target="_blank"
                        rel="noreferrer">
                        <span className="text-blue-400"> TIL </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block transition-opacity rounded-full hover:opacity-90 focus:outline-none focus:opacity-75"
                        href="/travel"
                        target="_blank"
                        rel="noreferrer">
                        <span className="text-blue-400"> Travel </span>
                      </Link>
                    </li>
                  </ul>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
