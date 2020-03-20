export class Post {
  id: number;
  titulo: string;
  imagen: string;
  contenido: string;
  categoria: string;
  fk_usuario: number;
  numero_autores: number;
  likes: number;
  fk_id_anterior: number;
  constructor(
    pId: number,
    pTitle: string,
    pImage: string,
    pContent: string,
    pCategory: string,
    pAutor: number,
    pAutors: number,
    pLikes: number,
    pIdAnterior:number,
  ) {
    this.id = pId;
    this.titulo = pTitle;
    this.imagen = pImage;
    this.contenido = pContent;
    this.categoria = pCategory;
    this.fk_usuario = pAutor;
    this.numero_autores = pAutors;
    this.likes = pLikes;
    this.fk_id_anterior = pIdAnterior;
  }
}
