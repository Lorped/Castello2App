import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Oggetto, Status, User } from '../global';

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

  disabled = false ;

  outputNome = '???????';
  outputDescrizione = '???????';
  outputSAN = '??';

  myMagia = new DescMagia();

  constructor(public userservice: UserService, public oggetto: Oggetto, public user: User, public status: Status) { }

  ngOnInit() {
    this.disabled = false;
    this.userservice.scanmagia(this.oggetto.id).subscribe(
      (data) => {
        
        //console.log(data);

        this.myMagia = data;
        this.myMagia.minmiti = Number (this.myMagia.minmiti);
        this.myMagia.mitiPG = Number (this.myMagia.mitiPG);
        this.myMagia.deltasan = Number (this.myMagia.deltasan);
        this.myMagia.deltamiti = Number (this.myMagia.deltamiti);
        this.myMagia.deltapf = Number (this.myMagia.deltapf);

        if (this.myMagia.minmiti <= this.myMagia.mitiPG) {
          this.outputNome = this.myMagia.nome;
          this.outputDescrizione = this.myMagia.descrizione;
          this.outputSAN = this.myMagia.deltasan.toString();
        }

        
      }
    );
  }

  lancia() {

    this.outputNome = this.myMagia.nome;
    this.outputDescrizione = this.myMagia.descrizione;
    this.outputSAN = this.myMagia.deltasan.toString();

    this.userservice.usamagia(this.oggetto.id).subscribe(
      (resp) => {
        this.outputNome = this.myMagia.nome;
        this.outputDescrizione = this.myMagia.descrizione;
        this.outputSAN = this.myMagia.deltasan.toString();

        this.user.Sanita += this.myMagia.deltasan;

        this.user.Miti += this.myMagia.deltamiti;
        this.user.PF += this.myMagia.deltapf;

        alert ('Magia Lanciata!');
        this.disabled = true;

      });
    
  }
  indietro(){
    this.status.magie = false ;
    this.status.generico = false;
    this.disabled=false;
  }

}
