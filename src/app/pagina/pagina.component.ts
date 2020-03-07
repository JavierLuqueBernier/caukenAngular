import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  arrMigas: any;

  constructor() {
    //El número de migas de pan debería ser limitado, unos 7 o menos sin scroll
    this.arrMigas = [1, 2, 3, 4, 5, 6, 7];
  }

  ngOnInit() {
  }

}
