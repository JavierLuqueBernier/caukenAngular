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
  ready: boolean;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private postService: PostService
  ) {
    this.ready = false;
  }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: DECISION_ACTIVE,
      loginActive: true
    });

    this.postService.getChildren({ id: this.id })
      .then(response => {
        if (!response.warning) {
          this.arrDecisions = response;
          this.ready = true;
          console.log(this.arrDecisions);
        } else {
          this.arrDecisions = [
            {
              titulo: 'no hay más decisiones'
            }
          ]
        }

      })
      .catch(err => {
        console.log(err);
      })
  }

  navegarPage(id) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/page/${id}`])
      /* window.scrollTo(0, 0); */
      this.ngOnInit();
    });
  }

}
