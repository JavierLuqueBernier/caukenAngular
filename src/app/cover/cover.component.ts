import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  pageId: number;
  post: Post;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.post = new Post(3, '¡Post no encontrado!', '../../assets/images/24.jpg', 'Parece que el post que estabas buscando no existe...', '#Categoría', 'Cauken', 0, 0);
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
