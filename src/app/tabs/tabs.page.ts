import { Component,  } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    imports: [IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs]
})
export class TabsPage {

  constructor() {}

}
