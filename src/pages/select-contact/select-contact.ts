import { AuthProvider } from './../../providers/auth/auth';
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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthProvider,
    public debtifyDatabase:DebtifyDatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectContactPage');
    this.contactList = this.debtifyDatabase.getContact(this.auth.currentUserId());
    console.log(this.contactList)
  }

  contactSelected(name) {
    this.type = this.navParams.get("Type");
    console.log(this.type)
    this.navCtrl.push(DebtCalcPage, {
      Type: this.type,
      Name: name
    });
  }

}