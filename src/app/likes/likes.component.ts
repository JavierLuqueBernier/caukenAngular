import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER } from '../actions';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  @Input() id: number;
  likes: number;
  likeActivo: boolean;
  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.likes = 0;
  }

  async ngOnInit() {
    console.log('id para likes: ' + this.id);
    try {
      const likes = await this.postService.getLikes({ id: this.id });
      this.likes = likes[0].likes;
      const likeActivo = await this.postService.checkLike(this.id);
      this.likes = this.likes = likes[0].likes;
      this.likeActivo = likeActivo.activo;
    } catch (err) {
      console.log(err);
    }
  }

  async manejarLike() {
    console.log('manejar like')
    try {
      const login = await this.userService.checkToken();
      if (login['login'] === false) {
        // Si el login no es válido se almacena en redux esta dirección para que el login pueda retornar aquí cuando valide
        this.ngRedux.dispatch({
          type: ROUTE_AFTER,
          routeAfter: `/cover/${this.id}`,
        });
        this.router.navigate(['/login']);
      } else {
        await this.postService.putLike(this.id);
        const likes = await this.postService.getLikes({ id: this.id });
        const likeActivo = await this.postService.checkLike(this.id);
        this.likes = this.likes = likes[0].likes;
        this.likeActivo = likeActivo.activo;
        console.log(this.likeActivo);
      }
    } catch (err) {
      console.log(err);
    }
  }

}
