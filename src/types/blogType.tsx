export interface IBlog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  images: string[];
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  isFeatured: boolean;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}
