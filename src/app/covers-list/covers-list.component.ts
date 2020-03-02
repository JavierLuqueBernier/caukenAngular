import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-covers-list',
  templateUrl: './covers-list.component.html',
  styleUrls: ['./covers-list.component.css']
})
export class CoversListComponent implements OnInit {
  @Input() tituloSeccion: string;
  constructor() { }

  ngOnInit() {
  }

}
