import { Injectable } from '@angular/core';
import { User } from './global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, public user: User) { }

  login(email: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHPapp/login.php', {
      email: email,
      password: password
    });
  }

  scanoggetto(barcode: string) {
    return this.http.get<any>('https://www.roma-by-night.it/Castello/wsPHPapp/scanoggetti.php?IDutente=' + this.user.IDutente + '&scan=' + barcode);
  }

  scanmagia(barcode: string) {
    return this.http.get<any>('https://www.roma-by-night.it/Castello/wsPHPapp/scanmagia.php?IDutente=' + this.user.IDutente + '&scan=' + barcode);
  }

  usamagia(barcode: string) {
    return this.http.get<any>('https://www.roma-by-night.it/Castello/wsPHPapp/usamagia.php?IDutente=' + this.user.IDutente + '&scan=' + barcode);
  }

  scanlist() {
    return this.http.get<any>('https://www.roma-by-night.it/Castello/wsPHPapp/getscanlist.php?IDutente=' + this.user.IDutente );
  }

  getuser() {
    return this.http.get<any>('https://www.roma-by-night.it/Castello/wsPHPapp/getusr.php?IDutente=' + this.user.IDutente );
  }

  risposta(risp: number, IDoggetto: string) {
    return this.http.get<any>('https://www.roma-by-night.it/Castello/wsPHPapp/risposta.php?IDutente=' + this.user.IDutente + '&Risposta=' + risp + '&IDoggetto=' + IDoggetto);
  }
  risposta2(risp: number, IDoggetto: string) {
    return this.http.get<any>('https://www.roma-by-night.it/Castello/wsPHPapp/risposta2.php?IDutente=' + this.user.IDutente + '&Risposta=' + risp + '&IDoggetto=' + IDoggetto);
  }

}
