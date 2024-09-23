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
