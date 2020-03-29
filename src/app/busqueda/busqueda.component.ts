import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { PostService } from '../post.service';
import { SEARCH_ACTIVE } from '../actions';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  search: any;
  arrBusqueda: any;
  searchActive: boolean;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private postService: PostService
  ) {
    this.searchActive = false;
  }

  async ngOnInit() {
    this.ngRedux.dispatch({
      type: SEARCH_ACTIVE,
      searchActive: true
    });
    let state = this.ngRedux.getState();
    this.search = state.search;
    this.ejecutarBusqueda();
    this.ngRedux.subscribe(() => {
      state = this.ngRedux.getState();
      this.search = state.search;
      this.ejecutarBusqueda();
    });

  }

  async ejecutarBusqueda() {
    try {
      const rows = await this.postService.find(this.search);
      if (rows.warning) {
        console.log('aquí llega')
        this.searchActive = false;
      } else {

        this.arrBusqueda = rows;
        this.searchActive = true;
      }

    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy() {
    this.ngRedux.dispatch({
      type: SEARCH_ACTIVE,
      searchActive: false

    });
  }


}

