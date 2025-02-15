export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  readingTime: string
  category: string
  featured: boolean
  coverImage: string
  author: {
    name: string
    avatar: string
  }
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}

