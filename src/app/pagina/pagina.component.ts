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
  post: Post;
  // La id que recibimos por params
  pageId: number;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // El número de migas de pan debería ser limitado, unos 7 o menos sin scroll
    this.arrMigas = [1, 2, 3, 4, 5, 6, 7];
    this.post = new Post(3, '¡Post no encontrado!', '../../assets/images/24.jpg', 'Parece que el post que estabas buscando no existe...', '#Categoría', 1, 0, 0, null);
  }

  async ngOnInit() {
    console.log('hola');
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params.pageId;
    });

    try {
      this.post = await this.postService.getById(this.pageId);
    } catch (err) {
      console.log(err);

    }
    console.log(this.post);

  }


  navegarPagina(id) {


    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/page/${id}`])
      this.ngOnInit();
    });


  }


}
