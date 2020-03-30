import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { SEARCH, USER_ACTIVE } from '../actions';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  sectionName: string;
  url: any;
  postRoute: boolean;
  registerActive: boolean;
  loginActive: boolean;
  decisionActive: boolean;
  searchActive: boolean;
  ocultarNav: boolean;
  desplegar: boolean;
  advancedSearch: FormGroup;
  userImage: string;
  usuarioConectado: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private userService: UserService
  ) {
    // Detecta si está en /pagina o /cover
    // Habría que cambiarlo por redux
    this.ocultarNav = false;
    router.events.subscribe(() => {
      this.url = this.location.path();
      this.postRoute = (this.url.slice(0, 5) === '/page' || this.url.slice(0, 6) === '/cover') ? true : false;

    });
    this.desplegar = false;
    this.searchActive = false;
    this.advancedSearch = new FormGroup({
      titulo: new FormControl(false),
      contenido: new FormControl(false),
      usuario: new FormControl(false),
      categoria: new FormControl(false),
    });
    this.userImage = '../../assets/images/disconnected.png';
    this.usuarioConectado = false;
  }

  async ngOnInit() {
    this.checkLogin();
    // Se subscribe a redux para recibir el nombre de la sección enviado desde CoverC
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();
      this.sectionName = state.sectionName;
      if (state.ocultarNav) {
        this.ocultarNav = true;
      } else {
        this.ocultarNav = false;
      }
      if (state.searchActive) {
        this.searchActive = true;
      } else {
        this.searchActive = false;
      }
      if (state.userActive) {
        this.checkLogin();

      }
    });
  }

  async checkLogin() {
    const login = await this.userService.checkToken();
    if (login['login'] === true) {
      const userId = localStorage.getItem('usuario');
      const user = await this.userService.getAvatar({ id: userId });
      console.log(user);
      if (user.imagen_perfil === null || user.imagen_perfil === '') {
        this.userImage = '../../assets/images/avatarDummy.png';
      } else {
        this.userImage = user.imagen_perfil;
      }
      this.usuarioConectado = true;
    } else {
      this.usuarioConectado = false;
    }
  }

  desplegarMenu() {
    this.desplegar = !this.desplegar;
  }

  irSeccion($event) {
  }

  manejarBusqueda(busqueda) {
    const searchForms = {
      word: busqueda,
      titulo: this.advancedSearch.get('titulo').value,
      contenido: this.advancedSearch.get('contenido').value,
      usuario: this.advancedSearch.get('usuario').value,
      categoria: this.advancedSearch.get('categoria').value,
    };
    this.ngRedux.dispatch({
      type: SEARCH,
      search: searchForms
    });
    this.router.navigate(['/search']);
  }

  navegarAreaUsuario() {
    this.router.navigate(['/myarea'])
  }


  desconectar() {
    localStorage.clear();
    this.ngRedux.dispatch({
      type: USER_ACTIVE,
      userActive: false
    });
    this.userImage = '../../assets/images/disconnected.png';
    this.usuarioConectado = false;
    this.router.navigate(['/home']);
  }
  // Va a la página anterior sin recargar angular
  retroceder() {
    this.location.back();
  }

}
