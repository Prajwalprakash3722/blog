import Link from 'next/link'

const Header = () => {
  return (
    <h2 className="text-xl text-cyan-50 md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/">
        <a className="skew-y-12 hover:underline">← back</a>
      </Link>
    </h2>
  )
}

export default Header
