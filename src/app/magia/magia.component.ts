import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../user.service';
import { Oggetto, Status, User } from '../global';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonRow,
} from '@ionic/angular';

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
    imports: [IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonRow]
})
export class MagiaComponent  implements OnInit {

  disabled = false ;

  outputNome = '???????';
  outputDescrizione = '???????';
  outputSAN = '??';

  myMagia = new DescMagia();

  constructor(public userservice: UserService, public oggetto: Oggetto, public user: User, public status: Status, private changeDetectorRef: ChangeDetectorRef) { }

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

        this.changeDetectorRef.markForCheck();
        
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
        this.user.punteggiAggiornati.next();
        this.changeDetectorRef.markForCheck();

      });
    
  }
  indietro(){
    this.status.magie = false ;
    this.status.generico = false;
    this.disabled=false;
  }

}
