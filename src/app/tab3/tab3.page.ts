import { Component } from '@angular/core';
import { Scan, User } from '../global';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  scanlist: Array<Scan> = [];

  constructor(public user: User, public userservice: UserService) {}


  ionViewWillEnter () {
    this.scanlist = [];
    this.loadscan();
  }


  loadscan(){
    this.userservice.scanlist().subscribe( resp => {
      this.scanlist = resp.scan;
      //console.log(this.scanlist);
    });
  }
}
