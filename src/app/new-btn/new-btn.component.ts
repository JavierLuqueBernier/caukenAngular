import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER, ID_PADRE } from '../actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { animate, style, group, query, transition, trigger, state } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-btn',
  templateUrl: './new-btn.component.html',
  styleUrls: ['./new-btn.component.css'],
  animations: [
    trigger('btnAnimate', [
      state('initial', style({
        width: '4rem', height: '4rem', right: '1rem', bottom: '1rem', opacity: '100%'
      })),
      state('final', style({
        width: '500rem', height: '500rem', right: '-260rem', bottom: '-260rem',opacity:'0%'
      })),
      transition('initial => final', [
        animate('.3s')
      ]),

    ])
  ]

})
export class NewBtnComponent implements OnInit {

  /* form: FormGroup;
  id_padre: number; */

  @Input() idPadre: number;
  animate: boolean;


  constructor(private postService: PostService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
  ) {
    /* this.id_padre = (this.postService.getIdPadre() != null) ? this.postService.getIdPadre() : ""; //esta funcion aun no existe en el servicio */
    this.idPadre = null;
    this.animate = false;
  }

  ngOnInit() {
    console.log('esto es lo que recibo del padre' + this.idPadre);
  }
 

  async crearPostBtn(/* pValor */) {
    /* console.log(pValor);
    this.form = new FormGroup({
      id_padre: new FormControl(this.id_padre)
    }) */
    this.animate = true;
    this.ngRedux.dispatch({
      type: ROUTE_AFTER,
      routeAfter: this.router.url
    });

    this.ngRedux.dispatch({
      type: ID_PADRE,
      idPadre: this.idPadre,
    });

    if (!this.idPadre) {
      console.log('IdPadre null');
      this.idPadre = null;

    } else if (this.idPadre) {
      console.log('IdPadre existe');
    }
    window.setTimeout(this.navigateNew.bind(this) , 200);

  }
  navigateNew() {
    this.router.navigate(['/new-post']);
  }
}
