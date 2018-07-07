import { UtilsProvider } from './../../providers/utils/utils';
import { DebtifyDatabaseProvider } from './../../providers/debtify-database/debtify-database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public debtifyDatabase:DebtifyDatabaseProvider) {
    this.contactList = debtifyDatabase.getContact();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  addNewContact() {
    console.log("add");
    let newContact = this.alertCtrl.create({
      title: 'New Contact',
      inputs: [
        {
          name: 'Name',
          type: 'string'
        },
      ],
      buttons: [
        {
          text: 'Submit',
          handler: name => {
            console.log(name);
            this.debtifyDatabase.addContact(name.Name);
          }
        }
      ]
    });
    newContact.present();
  }

  edit(prvName, slidingItem: ItemSliding) {
    slidingItem.close();
    let newContact = this.alertCtrl.create({
      title: 'Edit Contact',
      inputs: [
        {
          name: 'Name',
          type: 'string',
          value: prvName
        },
      ],
      buttons: [
        {
          text: 'Submit',
          handler: curName => {
            console.log(curName);
            this.debtifyDatabase.editContact(prvName, curName.Name);
          }
        }
      ]
    });
    newContact.present();
  }

}
