import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController} from 'ionic-angular';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
  
  public loading: Loading;

  constructor(
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {
  }

  dismissLoading(): Promise<any> {
    return this.loading.dismiss();
  }

  createLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  createAlert(message, text, handler = () => {}) {
    this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: text,
          handler: handler
        }
      ]
    }).present();
  }

}
