import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Oggetto, Status, User , DescOggetto} from '../global';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonInput,
  IonRow,
} from '@ionic/angular';




@Component({
    selector: 'app-oggetto',
    templateUrl: './oggetto.component.html',
    styleUrls: ['./oggetto.component.scss'],
    imports: [
      FormsModule,
      IonButton,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonCol,
      IonInput,
      IonRow,
    ]
})
export class OggettoComponent  implements OnInit {

  newoggetto = new DescOggetto();
  flagdomanda = 0;
  flagsi = 0;
  flagno = 0;

  rispok = 0;
  miarisposta = '';

  NumRisposte = 1;

  constructor( public userservice: UserService, public oggetto: Oggetto, public status: Status, public user: User, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.userservice.scanoggetto(this.oggetto.id).subscribe(
      (data) => {
        //console.log(data);
        this.newoggetto = data;
        //console.log(this.newoggetto);

        this.user.Sanita =  this.newoggetto.newsan;
        this.user.Miti = this.newoggetto.newmiti;
        this.user.PF = this.newoggetto.newpf;

        if(this.newoggetto.domanda != '') {
          this.flagdomanda = 1;
        }
        this.user.punteggiAggiornati.next();
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  dismiss(){
    this.flagdomanda = 0;
    this.flagsi = 0;
    this.flagno = 0;
    this.status.generico = false;
  }

  RispSI(){
    // mando call per segnare il tutto
    this.userservice.risposta(1, this.oggetto.id).subscribe(
      (data) => {
        //console.log(data);

        this.user.Sanita = data.sanita;
        this.user.Miti = data.miti;
        this.user.PF = data.pf;

        this.flagsi = 1;
        this.user.punteggiAggiornati.next();
        this.changeDetectorRef.markForCheck();
      }
    );
    
  }

  RispNO(){
    
    // mando call per segnare il tutto
    this.userservice.risposta(0, this.oggetto.id).subscribe(
      (data) => {
        //console.log(data);
        this.flagno = 1;
        this.user.punteggiAggiornati.next();
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  Risposta(){
    if (this.miarisposta.toUpperCase() == this.newoggetto.password.toUpperCase()) {
      // mando call per segnare risposta corretta
      this.userservice.risposta2(0, this.oggetto.id).subscribe(
        (data) => {
        //console.log(data);
          this.rispok = 1;     
          this.changeDetectorRef.markForCheck();
        }
      );
    } else {
      this.rispok = 2;
      this.NumRisposte++;
      if (this.NumRisposte > 10) {
        // mando call per segnare max risposte sbagliate
        this.userservice.risposta2(1, this.oggetto.id).subscribe(
          (data) => {
            //console.log(data);          
          }
        );
      }
    }
  }

  riprova(){
    this.rispok = 0;
    this.miarisposta = '';
  }

}
