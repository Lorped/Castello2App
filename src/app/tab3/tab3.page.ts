import { ChangeDetectorRef, Component,  } from '@angular/core';
import { Scan, User , Messaggio} from '../global';
import { UserService } from '../user.service';
import { Browser } from '@capacitor/browser';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: false
})
export class Tab3Page {

  scanlist: Array<Scan> = [];
  messaggi: Array<Messaggio> = [];
  timeline: Array<{ tipo: 'scan', data: string, timestamp: number, scan: Scan } | { tipo: 'messaggio', data: string, timestamp: number, messaggio: Messaggio }> = [];

  constructor(public user: User, public userservice: UserService,  private changeDetectorRef: ChangeDetectorRef) {}


  ionViewWillEnter () {
    this.scanlist = [];
    this.loadscan();
  }


  loadscan(){
    this.userservice.scanlist().subscribe( resp => {
      this.scanlist = resp.scan;
      this.messaggi = resp.messaggi;

      this.timeline = [
        ...this.scanlist.map(scan => ({ tipo: 'scan' as const, data: scan.datascan, timestamp: Number(scan.timestamp), scan })),
        ...this.messaggi.map(messaggio => ({ tipo: 'messaggio' as const, data: messaggio.data, timestamp: Number(messaggio.timestamp), messaggio })),
      ].sort((a, b) => b.timestamp - a.timestamp);
      this.changeDetectorRef.markForCheck();
      //console.log(this.scanlist);
    });
  }

  async openMessaggio(url: string) {
    // Implementa la logica per aprire il messaggio
      await Browser.open({ 
        url: url,
        windowName: '_system'
      });
  }
}
