export class Post {
  id: number;
  title: string;
  image: string;
  content: string;
  category: string;
  autor: string;
  autors: number;
  likes: number;
  constructor(
    pId: number,
    pTitle: string,
    pImage: string,
    pContent: string,
    pCategory: string,
    pAutor: string,
    pAutors: number,
    pLikes: number,
  ) {
    this.id = pId;
    this.title = pTitle;
    this.image = pImage;
    this.content = pContent;
    this.category = pCategory;
    this.autor = pAutor;
    this.autors = pAutors;
    this.likes = pLikes;
  }
}
