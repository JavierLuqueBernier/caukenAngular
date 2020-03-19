import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ROUTE_AFTER } from '../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit() {
  }

  async crearPostBtn() {
    this.ngRedux.dispatch({
      type: ROUTE_AFTER,
      routeAfter: '/home',

    });
    this.router.navigate(['/new-post'])
  }

}
