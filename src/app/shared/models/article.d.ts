export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  tags: string[];
}
