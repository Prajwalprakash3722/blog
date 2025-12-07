type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  draft: boolean;
  category: string;
  readingTime?: string;
};

export default PostType;
