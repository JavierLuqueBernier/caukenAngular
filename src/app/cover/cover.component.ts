import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { SECTION_NAME } from '../actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  pageId: number;
  post: any;
  urlName: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private ngRedux: NgRedux<IAppState>,
    private location: Location) {
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params.pageId;
    });
    try {
      this.post = await this.postService.getById(this.pageId);
    } catch (err) {
      console.log(err);
    }
    // Esto envía el título de la obra por redux
    this.ngRedux.dispatch({
      type: SECTION_NAME,
      sectionName: this.post.titulo,

    });
    // Esto cambia el nombre de la url por el título del árbol
    this.urlName = this.post.titulo.replace(/ /g, '-').toLowerCase();
    this.location.replaceState(this.urlName);

  }

}
