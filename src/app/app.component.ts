import { Component,  } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  bulbOutline,
  logOutOutline,
  personOutline,
  readerOutline,
} from 'ionicons/icons';

addIcons({
  'person-outline': personOutline,
  'bulb-outline': bulbOutline,
  'reader-outline': readerOutline,
  'log-out-outline': logOutOutline,
});

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor() {}
}
