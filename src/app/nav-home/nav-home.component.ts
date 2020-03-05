import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.css']
})
export class NavHomeComponent implements OnInit {
  @Input() sectionName: string;
  constructor() { }

  ngOnInit() {
  }

}
