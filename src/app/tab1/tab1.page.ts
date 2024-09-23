import { Component, OnInit } from '@angular/core';
import { User } from '../global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  img = '';

  constructor(public user: User, public router: Router) { }

  ngOnInit() {
    //console.log("user tab1", this.user);

    if (this.user.URLimg != "nopicture.gif") {
      this.img = "https://www.roma-by-night.it/Castello/assets/" + this.user.URLimg;
    } else {
      this.img="assets/imgs/nopicture.gif";  
    }

  
  }

  logout(){
    this.router.navigate(['login']);
  }

}
