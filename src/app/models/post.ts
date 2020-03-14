export class Post {
  id: number;
  titulo: string;
  imagen: string;
  contenido: string;
  categoria: string;
  autor: string;
  numero_autores: number;
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
    this.titulo = pTitle;
    this.imagen = pImage;
    this.contenido = pContent;
    this.categoria = pCategory;
    this.autor = pAutor;
    this.numero_autores = pAutors;
    this.likes = pLikes;
  }
}
