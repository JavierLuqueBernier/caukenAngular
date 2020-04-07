import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-covers-list',
  templateUrl: './covers-list.component.html',
  styleUrls: ['./covers-list.component.css']
})
export class CoversListComponent implements OnInit {
  @Input() tituloSeccion: string;
  @Input() listParameters: any[];
  arrPosts: Post[];
  errors: any[];
  constructor(private postService: PostService) {

  }

  async ngOnInit() {

    try {
      this.arrPosts = await this.postService.getCovers(this.listParameters);
    } catch (err) {
      this.errors = err;
      console.log(this.errors);

    }
  }

  async manejarAvanzar() {

    this.listParameters.offset += 2;

    try {
      this.arrPosts = await this.postService.getCovers(this.listParameters);
    } catch (err) {
      this.errors = err;
      console.log(this.errors);

    }
  }

  async manejarRetroceder() {
    if (this.listParameters.offset != 0) {
      this.listParameters.offset -= 2;
    }
    try {
      this.arrPosts = await this.postService.getCovers(this.listParameters);
    } catch (err) {
      this.errors = err;
      console.log(this.errors);

    }
  }

}
