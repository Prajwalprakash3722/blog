import Post from '../types/post'
import PostPreview from './post-preview'

type Props = {
  posts: Post[]
}

const LatestPosts = ({ posts }: Props) => {
  return (
    <section className='bg-[#1A1D23] p-8 rounded-lg my-4'>
      <h2 className="text-3xl font-bold leading-snug text-slate-100 my-4">
        Latest Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts?.sort((a, b) => 1 ? new Date(b.date).valueOf() - new Date(a.date).valueOf() : new Date(a.date).valueOf() - new Date(b.date).valueOf())
          .map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              date={post.date}
              slug={post.slug}
              content={post.content}
            />
          ))}
      </div>
    </section>
  )
}

export default LatestPosts
