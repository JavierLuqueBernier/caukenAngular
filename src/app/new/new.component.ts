import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER } from '../actions';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPostForm: FormGroup;
  errors: any;
  usuario: string;
  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.usuario = localStorage.getItem('usuario');
    this.newPostForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      imagen: new FormControl('', [
        Validators.maxLength(255)
      ]),
      categoria: new FormControl('', [
        Validators.maxLength(50)
      ]),
      contenido: new FormControl('', [
        Validators.maxLength(4096)
      ]),
      colaborable: new FormControl('colabo', [

      ]),

      publico: new FormControl('publico', [
      ]),
      latitud: new FormControl(null, [
      ]),
      longitud: new FormControl(null, [
      ]),
      // En estos tres campos el valor hay que obtenerlo del usuario y del post padre.
      fk_id_anterior: new FormControl(null, [
      ]),
      fk_usuario: new FormControl(this.usuario, [
      ]),
      fk_ancestro: new FormControl(null, [

      ]),

    });
  }
  /* se tiene que tener preparada la id del post anterior y la fk_ancestro si la hubiera, la id del usuario para rellenar los campos ocultos
  Está preparado en dos campos ocultos latitud y longitud */

  async ngOnInit() {
    // Se comprueba si el token es válido, si no navega a login. Independientemente el token se comprobará de nuevo al enviar el post.
    const login = await this.userService.checkToken();
    console.log('hola')
    console.log(login);
    if (login['login'] === false) {
      // Si el login no es válido se almacena en redux esta dirección para que el login pueda retornar aquí cuando valide
      this.ngRedux.dispatch({
        type: ROUTE_AFTER,
        routeAfter: '/new-post',

      });
      this.router.navigate(['/login']);
    }

  }

  async manejarSubmit() {
    console.log(this.newPostForm.value);
    const newPostForm = this.newPostForm.value;
    if (newPostForm.publico === 'guardarnext') {
      newPostForm.publico = 'privado';
    } else if (newPostForm.publico === 'publicarnext') {
      newPostForm.publico = 'publico';
    }
    try {
      const response = await this.postService.create(newPostForm);
      console.log(response);
      window.scrollTo(0, 0);
      this.router.navigate([`/page/${response.id}`])
    } catch (err) {
      this.errors = err;

    }
  }
}
