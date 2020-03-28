import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { PostService } from '../post.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  search: string;
  arrBusqueda: any;
  searchActive: boolean;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private postService: PostService
  ) {
    this.searchActive = false
  }

  async ngOnInit() {
    let state = this.ngRedux.getState();
    this.search = state.search;
    this.ejecutarBusqueda();
    this.ngRedux.subscribe(() => {
      state = this.ngRedux.getState();
      this.search = state.search;
      console.log(this.search);
      this.ejecutarBusqueda();
    });

  }

  async ejecutarBusqueda() {
    try {
      const rows = await this.postService.find({ word: this.search });
      console.log(rows)
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


}

