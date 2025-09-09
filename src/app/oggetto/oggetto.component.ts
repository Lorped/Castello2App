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
    this.status.generico = false;
  }

  RispSI(){
    
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

}
