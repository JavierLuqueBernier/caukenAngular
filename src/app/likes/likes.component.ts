import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  @Input() id: number;
  likes: number;
  constructor(
    private postService: PostService,
  ) { }

  async ngOnInit() {
    console.log('id para likes: ' + this.id);
    this.likes = await this.postService.getLikes({ id: this.id });
  }

}
