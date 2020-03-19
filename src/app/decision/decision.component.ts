import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Router } from '@angular/router';
import { DECISION_ACTIVE } from '../actions';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router
    ) { }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: DECISION_ACTIVE,
      loginActive: true
    });
  }

}
