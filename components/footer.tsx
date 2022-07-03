import Container from './container'

const Footer = () => {

  const navLinks = [
    {
      name: 'Home',
      path: "/"
    },
    {
      name: 'Twitter',
      path: "https://twitter.com/prajwal_3722"
    },
    {
      name: 'Github',
      path: "https://github.com/Prajwalprakash3722"
    },
    {
      name: 'Portfolio',
      path: "http://www.devcoffee.me"
    },
    {
      name: 'Roadmap',
      path: "/roadmap"
    },
    {
      name: 'RSS',
      path: 'rss.xml'
    }
  ]

  const madeUsingLinks = [{
    name: 'Next.JS',
    path: 'https://nextjs.org/'
  }, {
    name: 'Tailwind',
    path: 'https://tailwindcss.com/'
  }, {
    name: 'Typescript',
    path: 'https://www.typescriptlang.org/'
  }
  ]

  return (
    <footer className="border-t-2 border-gray-400">
      <Container>
        <div
          className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:pt-24"
        >
          <div className="lg:flex lg:items-end lg:justify-around">
            <div>
              <p
                className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 lg:text-left"
              >
                © {new Date().getFullYear()} Prajwal P
              </p>
            </div>

            <nav className="mt-12 lg:mt-0" aria-labelledby="footer-navigation">
              <h2 className="sr-only" id="footer-navigation">Footer navigation</h2>

              <ul
                className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12"
              >
                {navLinks.map(link => {
                  return (
                    <li key={link.name}>
                      <a className="text-white transition hover:text-white/75" href={link.path} target="_blank" key={link.name} rel="noreferrer">
                        {link.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
          <div className="absolute flex bottom-0 p-4 text-center">
            <p className="text-[#bbb] font-body text-sm">
              Made using{" "}
              {madeUsingLinks.map(link => (
                <>
                  <span className="text-[#50AEF1]" key={link.name}>
                    <a href={link.path} target="blank" key={JSON.stringify(link)}>
                      {link.name}
                    </a>
                  </span>
                  {link.name === "Typescript" ? "." : ","}{" "}
                </>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

