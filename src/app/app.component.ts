import { Component } from '@angular/core';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})

export class AppComponent {
  title = 'cauken';

  constructor(){}

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  recibirTituloSeccion($event){
    console.log($event)
  }

  ngOnInit(){
   
  }

}


