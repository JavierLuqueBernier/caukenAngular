import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER, ID_PADRE, ID_ANCESTRO } from '../actions';
import { Router } from '@angular/router';
import { animate, style, group, query, transition, trigger, state } from '@angular/animations';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-btn',
  templateUrl: './new-btn.component.html',
  styleUrls: ['./new-btn.component.css'],
  animations: [
    trigger('btnAnimate', [
      state('initial', style({
        width: '4rem', height: '4rem', right: '0rem', bottom: '0rem', opacity: '100%'
      })),
      state('final', style({
        width: '1000rem', height: '1000rem', right: '-560rem', bottom: '-560rem', opacity: '0%'
      })),
      transition('initial => final', [
        animate('.5s')
      ]),

    ])
  ]

})
export class NewBtnComponent implements OnInit {

  /* form: FormGroup;
  id_padre: number; */

  @Input() idPadre: number;
  @Input() idAncestro: number;
  animate: boolean;


  constructor(
    private postService: PostService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
  ) {
    /* this.id_padre = (this.postService.getIdPadre() != null) ? this.postService.getIdPadre() : ""; //esta funcion aun no existe en el servicio */
    this.idPadre = null;
    this.idAncestro = null;
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
    this.ngRedux.dispatch({
      type: ID_ANCESTRO,
      idAncestro: this.idAncestro
    })
    window.setTimeout(this.navigateNew.bind(this), 300);
  }

  navigateNew() {
    this.router.navigate(['/new-post']);
  }
}
