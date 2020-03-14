import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  arrMigas: any;
  post: Post;
  // La id que recibimos por params
  firstPageId: number;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
    // El número de migas de pan debería ser limitado, unos 7 o menos sin scroll
    this.arrMigas = [1, 2, 3, 4, 5, 6, 7];
  }

  async ngOnInit() {
    console.log('hola')
    console.log(this.activatedRoute.params._value.firstPageId)
    this.firstPageId= this.activatedRoute.params._value.firstPageId;
    try {
      this.post = await this.postService.getById(this.firstPageId);
    } catch (err) {
      console.log(err)

    }
    console.log(this.post)

  }

}
