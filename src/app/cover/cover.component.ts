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
    this.post = new Post(3, 'Título Post', 'https://picsum.photos/200/300', 'Contenido del post...', '#Categoría', 'Autor del Post', 33, 50)
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
