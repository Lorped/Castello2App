import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status, User } from '../global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
      

  login = new FormGroup({  
    email: new FormControl('',[ Validators.required ]),
    password: new FormControl('',[ Validators.required ]),
    checked: new FormControl(false),
  });


    

  constructor(public userservice: UserService, private user: User, public router: Router, public status: Status) { }

  ngOnInit() {
    var ee = window.localStorage.getItem( "castellouserid" ) ! ;
    var pp = window.localStorage.getItem( "castellopassword" ) ! ;
    this.login.controls.email.setValue(ee);
    this.login.controls.password.setValue(pp);
    //console.log(ee);
    
    if (ee != null )  { 
      this.login.controls.checked.setValue(true); 
    }

  }

  doLogin(){

    //console.log (this.login);
    //console.log (this.login.controls.checked.value);

    this.userservice.login(this.login.controls.email.value !, this.login.controls.password.value !).subscribe(
      (resp) => {
        if ( this.login.controls.checked.value == true ) {
          window.localStorage.setItem( "castellouserid" , this.login.controls.email.value ! );
          window.localStorage.setItem( "castellopassword" , this.login.controls.password.value ! );
        } else {
          window.localStorage.removeItem( "castellouserid" );
          window.localStorage.removeItem( "castellopassword" );
        }


        this.user.CognomePG = resp.user.CognomePG;
        this.user.IDbp = resp.user.IDbp;
        this.user.IDprofessione = resp.user.IDprofessione;
        this.user.IDspecial = resp.user.IDspecial;
        this.user.IDutente = resp.user.IDutente;
        this.user.Miti = Number ( resp.user.Miti);
        this.user.NomePG = resp.user.NomePG;
        this.user.PF = Number (resp.user.PF);
        this.user.Sanita = Number (resp.user.Sanita);
        this.user.URLimg = resp.user.URLimg;
        this.user.aaaa = resp.user.aaaa;
        this.user.bonus = resp.user.bonus;
        this.user.desc = resp.user.desc;
        this.user.descbp = resp.user.descbp;
        this.user.gg = resp.user.gg;
        this.user.mm = resp.user.mm;
        this.user.nomeprofessione = resp.user.nomeprofessione;
        this.user.nomespecial = resp.user.nomespecial;
        this.user.registratioID = resp.user.registratioID;
        this.user.xbonus = resp.user.registratioID;
        this.user.xspecpg = resp.user.xspecpg;
        

        //console.log("user: ", this.user);
        this.status.generico = false;
        this.status.magie = false;


        this.router.navigate(['tabs']);

      }, 
      error => {
        switch ( error.status ) {
          case 401:
            alert("Non autorizzato");
          break;
          case 404:
            alert("Scheda non trovata");
          break;
          default:
            alert("Server error");
        }
      }
    );
  }

}
