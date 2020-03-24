import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from '../post.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER } from '../actions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  id: number;
  newCommentForm: FormGroup;
  arrComments: any[];
  commentsActive: boolean;
  userid: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) {
    this.newCommentForm = new FormGroup({
      contenido: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
    });
    this.commentsActive = false;
  }

  async ngOnInit() {
    //Descomentar esto si se quiere que sea ruta hija
    /* this.activatedRoute.parent.params.subscribe(params => {
      this.id = params.pageId;
    }); */
    //Comentar esto se se quiere ruta hija
    this.activatedRoute.params.subscribe(params => {
      this.id = params.pageId;
    });
    this.arrComments = await this.postService.getComments({ id: this.id });
    this.commentsActive = true;
    const login = await this.userService.checkToken();
    if (login['login'] === true) {
      this.userid = parseInt(localStorage.getItem('usuario'));
      console.log(this.userid);
    }
  }

  async enviarComentario() {
    console.log(this.newCommentForm.value);
    this.newCommentForm.fk_post = this.id;
    console.log(this.newCommentForm.value)
    try {
      const login = await this.userService.checkToken();
      if (login['login'] === false) {
        // Si el login no es válido se almacena en redux esta dirección para que el login pueda retornar aquí cuando valide
        this.ngRedux.dispatch({
          type: ROUTE_AFTER,
          routeAfter: `/page/${this.id}/comments`,
        });
        this.router.navigate(['/login']);
      }
      const result = await this.postService.createComment({ contenido: this.newCommentForm.value.contenido, fk_post: this.id })
      if (result) {
        this.arrComments = await this.postService.getComments({ id: this.id });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async manejarDelete(comment) {
    try {
      const login = await this.userService.checkToken();
      if (login['login'] === false) {
        // Si el login no es válido se almacena en redux esta dirección para que el login pueda retornar aquí cuando valide
        this.ngRedux.dispatch({
          type: ROUTE_AFTER,
          routeAfter: `/page/${this.id}/comments`,
        });
        this.router.navigate(['/login']);
      }
      const result = await this.postService.deleteComment({ id: comment.id, fk_post: comment.fk_post, fk_usuario: comment.fk_usuario });
      if (result) {
        this.arrComments = await this.postService.getComments({ id: this.id });
      }
    } catch (err) {
      console.log(err)
    }
  }

}
