import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Router } from '@angular/router';
import { DECISION_ACTIVE, ROUTE_AFTER } from '../actions';
import { PostService } from '../post.service';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {

  @Input() id: number;
  @Output() outId: EventEmitter<any> = new EventEmitter();
  @Input() idAncestro: number;

  mostLikedChild: any;
  arrDecisions: any[];
  ready: boolean;
  mostLikedReady: boolean;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private postService: PostService
  ) {
    this.ready = false;
    this.mostLikedReady = false;
  }

  async ngOnInit() {
    this.ngRedux.dispatch({
      type: DECISION_ACTIVE,
      loginActive: true
    });
    try {
      const response = await this.postService.getChildren({ id: this.id });
      if (!response.warning) {
        this.arrDecisions = response;
        this.ready = true;
        console.log(this.arrDecisions);
      } else {
        this.arrDecisions = [
          {
            titulo: 'de momento no hay continuación. ¿Te atreves?'
          }
        ]
      }
    } catch (err) {
      console.log(err)
    }
    try {
      const response = await this.postService.findMostLikedChild({ id: this.id });
      if (!response.warning) {
        this.mostLikedChild = response;
        const index = this.arrDecisions.findIndex(elemento => elemento.id == this.mostLikedChild.id);
        this.arrDecisions.splice(index, 1);
        this.mostLikedReady = true;
        this.arrDecisions.unshift(this.mostLikedChild);
      }
    } catch (err) {
      console.log(err);
    }

  }

  navegarPage(id) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/page/${id}`])
      /* window.scrollTo(0, 0); */
      this.ngOnInit();
    });
  }

  /* async crearPostBtn() {  //comentado hasta que sepa exactamente que queremos poner aqui
    this.ngRedux.dispatch({
      type: ROUTE_AFTER,
      routeAfter: '/home',


    });
    this.router.navigate(['/new-post']);
  } */

}
