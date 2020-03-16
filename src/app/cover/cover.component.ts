import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  post: Post;
  constructor() {
    this.post = new Post(3, 'Título Post', 'https://picsum.photos/200/300', 'Contenido del post...', '#Categoría', 'Autor del Post', 33, 50)
  }

  ngOnInit() {
  }

}
