import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Oggetto, Status, User } from '../global';

export class DescOggetto {
  public nome = ''; 
  public descrizione = ''; // base
  public descrizione1 = '';  // PROFESSIONE
  public descrizione2 = ''; //SPECIAL
  public descrizione3 = ''; //IDBP
  public descrizione4 = ''; //PAIRED
  public deltasan = 0 ;
  public deltamiti = 0;
  public deltapf = 0;
  public newsan = 0 ;
  public newmiti = 0;
  public newpf = 0;

}


@Component({
  selector: 'app-oggetto',
  templateUrl: './oggetto.component.html',
  styleUrls: ['./oggetto.component.scss'],
})
export class OggettoComponent  implements OnInit {

  newoggetto = new DescOggetto();

  constructor( public userservice: UserService, public oggetto: Oggetto, public status: Status, public user: User) { }

  ngOnInit() {

    this.userservice.scanoggetto(this.oggetto.id).subscribe(
      (data) => {
        //console.log(data);
        this.newoggetto = data;
        //console.log(this.newoggetto);

        this.user.Sanita =  this.newoggetto.newsan;
        this.user.Miti = this.newoggetto.newmiti;
        this.user.PF = this.newoggetto.newpf;
      }
    );
  }

  dismiss(){
    this.status.generico = false;
  }

}
