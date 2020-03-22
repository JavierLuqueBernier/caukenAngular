import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() id: number;
  @Output() outId: EventEmitter<any> = new EventEmitter();

  arrDecisions: any[];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private postService: PostService
  ) {

  }

  ngOnInit() {
    console.log(this.id);
    this.ngRedux.dispatch({
      type: DECISION_ACTIVE,
      loginActive: true
    });

    this.postService.getChildren({ id: this.id })
      .then(response => {
        console.log(response);
        this.arrDecisions = response;
      })
      .catch(err => {
        console.log(err);
      })

    console.log(this.arrDecisions);
  }

  navegarPage(id) {
    console.log('navego');
    this.outId.emit(id);
  }

}
