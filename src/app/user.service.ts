import { Injectable } from '@angular/core';
import { User } from './global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHPapp/login.php', {
      email: email,
      password: password
    });
  }
}
