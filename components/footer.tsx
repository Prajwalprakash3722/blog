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
      path:'rss.xml'
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
                    <li>
                      <a className="text-white transition hover:text-white/75" href={link.path} target="_blank">
                        {link.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

