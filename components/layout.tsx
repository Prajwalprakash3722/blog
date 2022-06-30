import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import PostType from '../types/post'

type Props = {
  children: React.ReactNode,
  newArticle?: PostType,
}

const Layout = ({ children,newArticle }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen snap-y">
        <Alert newArticle={newArticle}/>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
