import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';


import { Tab2PageRoutingModule } from './tab2-routing.module';
import { OggettoComponent } from '../oggetto/oggetto.component';
import { MagiaComponent } from '../magia/magia.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    Tab2PageRoutingModule,

  ],
  declarations: [
    Tab2Page, 
    OggettoComponent,
    MagiaComponent 
  ]
})
export class Tab2PageModule {}
