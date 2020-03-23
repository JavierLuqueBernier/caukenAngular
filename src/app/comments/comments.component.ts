import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  id: number;
  commentForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute) {
    this.commentForm = new FormGroup({
      contenido: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
    })
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params.pageId;
    });
  }

  enviarComentario(){
    console.log(this.commentForm.value);
  }

}
