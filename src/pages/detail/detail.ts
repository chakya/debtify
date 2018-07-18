import { DebtifyDatabaseProvider } from './../../providers/debtify-database/debtify-database';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ItemSliding } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  oweList: Observable<any>;
  lendList: Observable<any>;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public debtifyDb: DebtifyDatabaseProvider,
    public alertCtrl: AlertController) {
    this.name = navParams.get("Name");
    this.oweList = this.debtifyDb.getOwe(this.name);
    this.lendList = this.debtifyDb.getLend(this.name);
  }

  ionViewDidLeave(){
   console.log('ionViewDidLeave DetailPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  editDebt(type, debt, slidingItem: ItemSliding) {
    slidingItem.close();
    let newContact = this.alertCtrl.create({
      title: 'Edit Contact',
      inputs: [
        {
          name: 'Amount',
          value: Math.abs(debt.Amount)
        },
        {
          name: 'Note',
          value: debt.Note
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: _ => {
            console.log("cancelled");
          }
        },
        {
          text: 'Submit',
          handler: (data) => {            
            data["Name"] = debt.Name;
            data["Id"] = debt.Id;
            this.debtifyDb.editDebtDetail(type, debt.Id, data);
          }
        }
      ]
    });
    newContact.present();
  }

  deleteDebt(type, debt, slidingItem: ItemSliding) {
    console.log(debt);
    slidingItem.close();
    let deleteDebt = this.alertCtrl.create({
      message: "Are you sure?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.debtifyDb.deleteDebtDetail(type, debt.Id);
          }
        }
      ]
    });
    deleteDebt.present();
  }

}
