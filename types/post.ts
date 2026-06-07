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
  destination?: string;
  readingTime?: string;
};

export default PostType;
