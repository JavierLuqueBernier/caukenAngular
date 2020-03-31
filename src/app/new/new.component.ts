import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER, POST_DATA } from '../actions';
import { Post } from '../models/post';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  postPadre: any;
  newPostForm: FormGroup;
  errors: any;
  postData: any;
  usuario: string;
  titulo: string;
  imagen: string;
  contenido: string;
  categoria: string;
  editorStyle: any;
  editorConfig: any;
  geoActivo: boolean;
  tipoTitulo: string;
  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.postData = {};
    this.usuario = localStorage.getItem('usuario');
    this.geoActivo = false;
    this.tipoTitulo = '¡Estás creando un hilo nuevo!';
    this.editorStyle = {
      height: '50vh',
      fontFamily: "'Roboto', Helvetica, sans-serif",
      border: 'none'
    }
    this.editorConfig = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link']
      ],
    }
    /* this.titulo = '';
    this.imagen = '';
    this.contenido = '';
    this.categoria = ''; */
    this.newPostForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      imagen: new FormControl(null, [
        Validators.maxLength(255)
      ]),
      categoria: new FormControl(null, [
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
    window.scrollTo(0, 0);
    // Se comprueba si el token es válido, si no navega a login. Independientemente el token se comprobará de nuevo al enviar el post.
    const login = await this.userService.checkToken();
    if (login['login'] === false) {
      // Si el login no es válido se almacena en redux esta dirección para que el login pueda retornar aquí cuando valide
      this.ngRedux.dispatch({
        type: ROUTE_AFTER,
        routeAfter: '/new-post',
      });
      this.router.navigate(['/login']);
    }
    /*---------------------------------------------------------------- */
    /*----------------------RECUPERAR DATOS REDUX--------------------- */
    /*---------------------------------------------------------------- */
    const state = this.ngRedux.getState();

    this.postData = state.postData;
    this.newPostForm.get('fk_id_anterior').setValue(state.idPadre);
    this.newPostForm.get('fk_ancestro').setValue(state.idAncestro);
    console.log('los datos que necesito')
    console.log(this.newPostForm.controls.fk_id_anterior.value);
    console.log(this.newPostForm.controls.fk_ancestro.value);
    if (this.newPostForm.controls.fk_id_anterior.value != null) {
      this.tipoTitulo = '¡Estás creando en un hilo existente!';
    }



    this.newPostForm.get('titulo').setValue(this.postData.titulo);
    console.log(this.postData);


  }

  async manejarSubmit() {
    const newPostForm = this.newPostForm.value;
    if (newPostForm.publico === 'guardarnext') {
      newPostForm.publico = 'privado';
    } else if (newPostForm.publico === 'publicarnext') {
      newPostForm.publico = 'publico';
    }
    try {
      const response = await this.postService.create(newPostForm);
      //Si devuelve error por token caducado
      if (response.error) {
        //1 se guarda ruta en redux
        this.ngRedux.dispatch({
          type: ROUTE_AFTER,
          routeAfter: '/new-post',

        });
        //2 se guardan datos en formulario
        const postDataRecord = {
          titulo: this.newPostForm.get('titulo').value
        }
        console.log(postDataRecord);
        this.ngRedux.dispatch({
          type: POST_DATA,
          postData: postDataRecord,

        });
        //3 se navega a login
        this.router.navigate(['/login']);
        //Si no hay error de token se navega a la pagina publicada
      } else {
        window.scrollTo(0, 0);
        this.router.navigate([`/page/${response.id}`]);
      }
    } catch (err) {
      this.errors = err;
    }
  }

  recibirCoordenadas($event) {
    console.log($event)
    this.newPostForm.get('latitud').setValue($event.latitud);
    this.newPostForm.get('longitud').setValue($event.longitud);
  }

  desplegarGeolocalizacion() {
    this.geoActivo = !this.geoActivo;
    if (this.geoActivo === false) {
      this.newPostForm.get('latitud').setValue(null);
      this.newPostForm.get('longitud').setValue(null);
    }
  }
}
