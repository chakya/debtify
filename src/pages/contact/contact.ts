import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DebtCalcPage } from '../debt-calc/debt-calc';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contactList: Observable<any>;
  debtType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.debtType = navParams.get("debtType");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  addValue(person) {
    this.navCtrl.push(DebtCalcPage, {
      person: person,
      debtType: this.debtType
    });
  }

}
