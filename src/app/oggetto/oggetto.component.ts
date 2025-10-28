import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Oggetto, Status, User , DescOggetto} from '../global';




@Component({
  selector: 'app-oggetto',
  templateUrl: './oggetto.component.html',
  styleUrls: ['./oggetto.component.scss'],
})
export class OggettoComponent  implements OnInit {

  newoggetto = new DescOggetto();
  flagdomanda = 0;
  flagsi = 0;
  flagno = 0;

  rispok = 0;
  miarisposta = '';

  NumRisposte = 1;

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

        if(this.newoggetto.domanda != '') {
          this.flagdomanda = 1;
        }
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
      }
    );
    
  }

  RispNO(){
    
    // mando call per segnare il tutto
    this.userservice.risposta(0, this.oggetto.id).subscribe(
      (data) => {
        //console.log(data);
        this.flagno = 1;
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
