import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Router } from '@angular/router';
import { DECISION_ACTIVE } from '../actions';
import { PostService } from '../post.service';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {
  
  arrDecisions: Array<[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: DECISION_ACTIVE,
      loginActive: true
    });

    this.postService.getChildren()
    .then( response => {
      console.log(response);
      this.arrDecisions = response;
    })
    .catch( err => {
      console.log(err);
    })
  }

}
