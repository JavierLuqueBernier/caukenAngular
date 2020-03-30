import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER } from '../actions';
import { PostService } from '../post.service';

@Component({
  selector: 'app-my-area',
  templateUrl: './my-area.component.html',
  styleUrls: ['./my-area.component.css']
})
export class MyAreaComponent implements OnInit {
  id: number;
  arrPublicos: any[];
  arrPrivados: any;
  publicosActivo: boolean;
  privadosActivo: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router

  ) {
    this.arrPrivados = [];
    this.arrPublicos = [];
    this.publicosActivo = false;
    this.privadosActivo = false;
  }

  async ngOnInit() {
    const login = await this.userService.checkToken();
    if (login['login'] === false) {
      // Si el login no es válido se almacena en redux esta dirección para que el login pueda retornar aquí cuando valide
      this.ngRedux.dispatch({
        type: ROUTE_AFTER,
        routeAfter: `/myarea/${this.id}`,
      });
      this.router.navigate(['/login']);
    } else {
      const id = localStorage.getItem('usuario');
      this.id = parseInt(id);
      //Recuperar si ha hecho login;
      this.pintarMisPostsPrivados();
      this.pintarMisPostsPublicos();
    }
  }

  async pintarMisPostsPublicos() {
    this.arrPublicos = await this.postService.getByUser({ id: this.id });
    this.publicosActivo = true;


  }


  async pintarMisPostsPrivados(){
    this.arrPrivados = await this.postService.getPrivateByUser({id: this.id});
    this.privadosActivo = true;
  }
  pintarMisLecturas() {

  }

}
