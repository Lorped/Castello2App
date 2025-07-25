import { Component } from '@angular/core';
import { Scan, User , Messaggio} from '../global';
import { UserService } from '../user.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  scanlist: Array<Scan> = [];
  messaggi: Array<Messaggio> = [];

  constructor(public user: User, public userservice: UserService, private iab: InAppBrowser,) {}


  ionViewWillEnter () {
    this.scanlist = [];
    this.loadscan();
  }


  loadscan(){
    this.userservice.scanlist().subscribe( resp => {
      this.scanlist = resp.scan;
      this.messaggi = resp.messaggi;

      this.scanlist.sort((a, b) => {
        return <any>new Date(a.datascan) - <any>new Date(b.datascan);
      });
      //console.log(this.scanlist);
    });
  }

  openMessaggio(url: string) {
    // Implementa la logica per aprire il messaggio
    this.iab.create(url,'_system');
  }
}
