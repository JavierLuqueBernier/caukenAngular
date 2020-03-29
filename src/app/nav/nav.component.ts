import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { SEARCH } from '../actions';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(
    private location: Location,
    private router: Router,
    private ngRedux: NgRedux<IAppState>) {
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
    })
  }

  ngOnInit() {
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
      }
      else {
        this.searchActive = false;
      }
    });
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

  navegarAreaUsuario(){
    this.router.navigate(['/myarea'])
  }

  // Va a la página anterior sin recargar angular
  retroceder() {
    this.location.back();
  }

}
