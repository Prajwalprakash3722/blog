/* eslint-disable @next/next/no-img-element */
const Intro = () => {
  return (
    <section className="flex flex-col min-h-fit items-center justify-center snap-normal my-8">
      <img src="/assets/genralImages/booleans.png" alt="Binary Numbers" />
      <div className="max-w-3xl sm:text-justify">
        <h1 className="text-[24.4px] font-semibold tracking-none leading-[150%] text-gray-400 mb-4 lg:leading-[200%] lg:mb-0">
          Hi <span className="wave">👋🏻</span>{" "}
          <span className="text-[#E8E8FD]">I&apos;m Prajwal</span>, Currently an
          undergraduate student & avid book reader, who has messed up with
          pods,broke containers rather building them up, paid <s>$92</s> for AWS
          for making a small mistake, always eager to build/fix/<s>break</s>{" "}
          things & learn, currently interested in how <b>scalable</b> systems
          are built? and this is my blog. <br /><br/>
          Here, I share through my writing; my experience as a Computer science
          student and everything I&apos;m learning about on React, Typescript,
          Go, Serverless, System Design and Testing.
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
                  rel="noreferrer"
                >
                  About me
                </a>
              </span>
              <div className="relative inline-block px-8 py-3 group">
                <span className="text-indigo-400 hover:text-gray-100 transition-opacity duration-200 group-hover:opacity-0">
                  @prajwal_3722
                </span>
                <span>
                  <ul className="absolute inset-0 flex items-center justify-center space-x-3 transition-opacity opacity-0 group-hover:opacity-100">
                    <li>
                      <a
                        className="block transition-opacity rounded-full hover:opacity-90 focus:outline-none focus:opacity-75"
                        href="https://twitter.com/prajwal_3722"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="sr-only"> Twitter </span>
                        <svg
                          className="w-5 h-5 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="block transition-opacity rounded-full hover:opacity-90 focus:outline-none focus:opacity-75"
                        href="https://github.com/Prajwalprakash3722"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="sr-only"> GitHub </span>
                        <svg
                          className="w-5 h-5 bg-slate-50 rounded-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
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
