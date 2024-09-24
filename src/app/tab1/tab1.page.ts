import { Component, OnInit } from '@angular/core';
import { User } from '../global';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  img = '';

  constructor(public user: User, public router: Router, public userservice: UserService) { }

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


  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadusr();
      event.target.complete();
    }, 2000);
  }

  loadusr(){
    this.userservice.getuser().subscribe(
      data => {
        this.user.Sanita = Number(data.Sanita);
        this.user.Miti = Number(data.Miti);
        this.user.PF = Number(data.PF);
      }
    );
  }

}
