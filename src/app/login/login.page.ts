import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status, User } from '../global';
import { Router } from '@angular/router';

import { CapacitorConfig } from '@capacitor/cli';
// import { FCM } from "@capacitor-community/fcm";

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { HttpClient } from '@angular/common/http';


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


    

  constructor(public userservice: UserService, private user: User, public router: Router, public status: Status, public http: HttpClient) { }

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
        this.user.registrationID = resp.user.registrationID;
        this.user.xbonus = resp.user.xbonus;
        this.user.xspecpg = resp.user.xspecpg;
        

        //console.log("user: ", this.user);
        this.status.generico = false;
        this.status.magie = false;






        // Request permission to use push notifications
    
        PushNotifications.requestPermissions().then(result => {
          if (result.receive === 'granted') {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
          }
        });

        PushNotifications.createChannel(
          {
            name: 'Castello Channel',
            id: 'PushPluginChannel',
            description: 'Castello Channel',
            importance: 5,
            sound: 'notturna_sound'
          }
        );

        const config: CapacitorConfig = {
          plugins: {
            PushNotifications: {
              presentationOptions: ["badge", "sound", "alert"],
            },
          },
        };


        PushNotifications.addListener('registration', (token: Token) => {
          //alert('Push registration success, token: ' + token.value);
          let updateurl = 'https://www.roma-by-night.it/Castello/wsPHPapp/updateid.php?userid='+ this.user.IDutente+'&id='+token.value;
			    this.http.get(updateurl).subscribe(res =>  {
            // updated
            //alert('Device registered '+token.value);
			    });

        });

        PushNotifications.addListener('registrationError', (error: any) => {
          alert('Error on registration: ' + JSON.stringify(error));
        });

        PushNotifications.addListener(
          'pushNotificationReceived',
          (notification: PushNotificationSchema) => {
            //alert('Push received: ' + JSON.stringify(notification));
          },
        );

        PushNotifications.addListener(
          'pushNotificationActionPerformed',
          (notification: ActionPerformed) => {
            //alert('Push action performed: ' + JSON.stringify(notification));
          },
        );

        /****
    
        FCM.subscribeTo({ topic: 'user' })
        .then(r => console.log(`subscribed to topic: user `))
        .catch(err => console.log(err));

        this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getregistra.php' ).subscribe( (data:any) => {
          this.listaclan = data.clan;

          this.listaclan.forEach(element => {
            if ( element.idclan != Number(this.user.fulldata.idclan)){
              FCM.unsubscribeFrom({ topic: element.nomeclan });
              //console.log(`unsubscribed from topic: `, element.nomeclan);
            }
          });
        });


         *****/






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
