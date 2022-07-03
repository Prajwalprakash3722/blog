import Post from '../types/post'
import PostPreview from './post-preview'

type Props = {
  posts: Post[]
}

const Catagories = ({ posts }: Props) => {

  return (
    <section className='relative bg-[#1A1D23] p-8 rounded-lg my-4'>
      <h2 className="text-3xl font-bold leading-snug text-slate-100 my-4">
        Catagories
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(item => item.category)
          .filter((value, index, self) => self.indexOf(value) === index).sort().map(category => (
            <a href={`posts/tag/${category}`}>
              <div className="p-2 group rounded-lg hover:bg-[#1D2433] cursor-pointer">
                <p className="break-words text-xl px-4 py-2 text-[#DFDFF3] font-medium md:text-2xl group-hover:text-[#5686F5] text-center">{category}</p>
              </div>
            </a>
          ))}
      </div>
    </section>
  )
}

export default Catagories
