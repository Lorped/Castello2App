import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { User, Oggetto, Status } from "./app/global";
import { provideHttpClient, withXhr } from "@angular/common/http";
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(routes),
        provideIonicAngular(),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        User,
        Oggetto,
        Status,
        provideHttpClient(withXhr()),
    ],
}).catch((err) => console.log(err));
