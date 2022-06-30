const Intro = () => {
  return (
    <section className="flex flex-col min-h-screen items-center justify-center snap-normal">
      <img src="/assets/genralImages/booleans.png" />
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-none leading-[150%] text-gray-400 mb-4 md:text-4xl lg:leading-[200%] lg:mb-0">
          Hi <span className="wave">👋🏻</span>{" "}
          <span className="text-[#E8E8FD]">I'm Prajwal</span>, and this is my
          blog. Here, I share through my writing my experience as a Computer
          science student and everything I'm learning about on React,
          Typescript, Go, Serverless, System Design and Testing.
        </h1>
      </div>
      <div>
        <div className="grid gap-8 items-start justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button className="relative px-7 py-4 bg-[#1C2333] rounded-lg leading-none flex items-center divide-x divide-gray-600">
              <span className="flex items-center space-x-5">
                <a className="pr-6 text-gray-100 hover:text-indigo-400" href="https://www.devcoffee.me" target="_blank">About me</a>
              </span>
              <span className="pl-6 text-indigo-400 hover:text-gray-100 transition duration-200">
                @prajwal3722
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
