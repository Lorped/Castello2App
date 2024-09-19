import { Component, OnInit } from '@angular/core';
import { User } from '../global';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  img = '';

  constructor(public user: User) { }

  ngOnInit() {
    console.log("user tab1", this.user);

    if (this.user.URLimg != "nopicture.gif") {
      this.img = "https://www.roma-by-night.it/Castello/assets/" + this.user.URLimg;
    } else {
      this.img="assets/imgs/"+this.user.URLimg;  
    }

  
  }

}
