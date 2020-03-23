import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  id: number;
  commentForm: FormGroup;
  arrComments: any[];
  commentsActive: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.commentForm = new FormGroup({
      contenido: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
    });
    this.commentsActive = false;
  }

  async ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params.pageId;
    });
    this.arrComments = await this.postService.getComments({id:this.id});
    this.commentsActive = true;
    console.log(this.arrComments);
  }

  enviarComentario() {
    console.log(this.commentForm.value);
  }

}
