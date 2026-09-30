import { ChangeDetectorRef, Component,  } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular/lazy';
import { Oggetto, Status, User } from '../global';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: false
})
export class Tab2Page {

  


  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  constructor(public alertController: AlertController, public oggetto: Oggetto, public status: Status, public user: User, private changeDetectorRef: ChangeDetectorRef) {
    this.initialstuff();
  }



  async initialstuff(){
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
    }
    this.changeDetectorRef.markForCheck();
    
    let { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
 
    if (available == false ){
      // alert("debug: module not available");
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } else {
      // alert("debug: module available");
    }
    this.changeDetectorRef.markForCheck();
    
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async openbarcode() {

    //   DEGUG !!!!
    /***************
    this.oggetto.id='358035692152';

    if (this.oggetto.id.substring(0,1)=='M'){
      this.status.magie = true ;
      this.status.generico = false;
      
    } else {
      this.status.magie = false ;
      this.status.generico = true;
    }
    return ;
    ****************/
    //this.router.navigate(['/tabs/oggetto']);
    /****************/
    //   FINE DEBUG !!!!


    this.barcodes = [];



    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    this.changeDetectorRef.markForCheck();


    this.oggetto.id=this.barcodes[0].rawValue;



    if (this.oggetto.id.substring(0,1)=='M'){
      this.status.magie = true ;
      this.status.generico = false;
      
    } else {
      this.status.magie = false ;
      this.status.generico = true;
    }
    this.changeDetectorRef.markForCheck();
 
  }

}
