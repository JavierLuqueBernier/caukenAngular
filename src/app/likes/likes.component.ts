import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  @Input() id: number;
  constructor() { }

  ngOnInit() {
    console.log('id para likes: '+this.id)
  }

}
