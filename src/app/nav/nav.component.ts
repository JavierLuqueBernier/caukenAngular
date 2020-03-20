import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';

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
  ocultar: boolean;
  desplegar: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private ngRedux: NgRedux<IAppState>) {
    // Detecta si está en /pagina o /cover
    // Habría que cambiarlo por redux
    this.ocultar = false;
    router.events.subscribe(() => {
      this.url = this.location.path();
      this.postRoute = (this.url.slice(0, 5) === '/page' || this.url.slice(0, 6) === '/cover') ? true : false;

    });
    this.desplegar = false;




  }

  ngOnInit() {
    // Se subscribe a redux para recibir el nombre de la sección enviado desde CoverC
    this.ngRedux.subscribe(() => {
      const state = this.ngRedux.getState();
      this.sectionName = state.sectionName;
      if (state.registerActive || state.loginActive || state.decisionActive) {
        this.ocultar = true;
      } else {
        this.ocultar = false;
      }

    });




  }

  desplegarMenu() {
    this.desplegar = !this.desplegar;

  }

  irSeccion($event) {



  }


  // Va a la página anterior sin recargar angular
  retroceder() {
    this.location.back();
  }

}
