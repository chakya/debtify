import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DebtifyDatabaseProvider } from './../../providers/debtify-database/debtify-database';
import { DebtCalcPage } from '../debt-calc/debt-calc';

/**
 * Generated class for the SelectContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-contact',
  templateUrl: 'select-contact.html',
})
export class SelectContactPage {
  contactList:any;
  type:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public debtifyDatabase:DebtifyDatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectContactPage');
    this.contactList = this.debtifyDatabase.getContact();
  }

  contactSelected(contact) {
    console.log(contact)
    this.type = this.navParams.get("Type");
    this.navCtrl.push(DebtCalcPage, {
      Type: this.type,
      Contact: contact
    });
  }

}