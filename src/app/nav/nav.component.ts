import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() nombreEntorno: string;
  url: any;
  postRoute: boolean;

  constructor(private location: Location, private router: Router) {
    router.events.subscribe((val) => {
      this.url = location.path();
      this.postRoute = (this.url.slice(0, 5) === '/page') ? true : false;
      console.log(this.postRoute)
    });




  }

  ngOnInit() {



  }

}
