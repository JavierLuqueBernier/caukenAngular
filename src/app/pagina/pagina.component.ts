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
  arrMigas: any[];
  post: any;
  migasReady: boolean;
  // La id que recibimos por params
  pageId: number;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // El número de migas de pan debería ser limitado, unos 7 o menos sin scroll
    /* this.arrMigas = [1, 2, 3, 4, 5, 6, 7]; */
    this.migasReady = false;

  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.pageId = params.pageId;

    });
    try {
      this.post = await this.postService.getById(this.pageId);
      console.log(this.post)
    } catch (err) {
      console.log(err);
    }
    try {
      this.arrMigas = await this.postService.getAncestors({ fk_id_anterior: this.post.fk_id_anterior, limit: 7 });
      console.log(this.arrMigas);

      if (this.arrMigas.length === undefined) {
        this.arrMigas = [];
      }
      this.arrMigas.push({ id: this.post.id, titulo: 'Estás en esta página' });
      this.migasReady = true;
    } catch (err) {
      console.log(err)
    }
  }

  navegarMiga(id) {


    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/page/${id}`]);
      this.ngOnInit();
    });


  }

}
