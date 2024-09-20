import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Oggetto } from '../global';

export class DescMagia  {
  public nome = '';
  public descrizione = '';
  public minmiti = 0;
  public mitiPG = 0 ;
  public deltasan = 0 ;
  public deltamiti = 0;
  public deltapf = 0;
  
}

@Component({
  selector: 'app-magia',
  templateUrl: './magia.component.html',
  styleUrls: ['./magia.component.scss'],
})
export class MagiaComponent  implements OnInit {

  constructor(public userservice: UserService, public oggetto: Oggetto) { }

  ngOnInit() {
    this.userservice.scanmagia(this.oggetto.id).subscribe(
      (data) => {
        
        console.log(data);
        
      }
    );
  }

}
