import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../models/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  arrMigas: any;
  post: any;
  // La id que recibimos por params
  pageId: number;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // El número de migas de pan debería ser limitado, unos 7 o menos sin scroll
    this.arrMigas = [1, 2, 3, 4, 5, 6, 7];
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params.pageId;
    });

    try {
      this.post = await this.postService.getById(this.pageId);
    } catch (err) {
      console.log(err);
    }
  }





}
