import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER } from '../actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { animate, style, group, query, transition, trigger, state } from '@angular/animations';

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

  @Input() idPadre: number;
  animate: boolean;
  constructor(
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.idPadre = null;
    this.animate = false;
  }

  ngOnInit() {

  }


  async crearPostBtn() {
    this.animate = true;
    this.ngRedux.dispatch({
      type: ROUTE_AFTER,
      routeAfter: this.router.url
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
