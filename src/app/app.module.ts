import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';



import { User, Oggetto, Status } from './global';

import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    User,
    Oggetto,
    Status,
    provideHttpClient(),
    InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
