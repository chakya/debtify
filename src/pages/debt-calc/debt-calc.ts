import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DebtCalcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-debt-calc',
  templateUrl: 'debt-calc.html',
})
export class DebtCalcPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  amountDisplay:string='0';

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtCalcPage');
  }

  updAmount(char:string){
    this.amountDisplay=char
  }
}
