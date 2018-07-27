import { AuthProvider } from './../../providers/auth/auth';
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
  loadingLend: boolean = true;
  loadingOwe: boolean = true;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public debtifyDb: DebtifyDatabaseProvider,
    public auth: AuthProvider,
    public alertCtrl: AlertController) {
    this.name = navParams.get("Name");
    this.oweList = this.debtifyDb.getOwe(this.auth.currentUserId(), this.name);
    this.debtifyDb.getOwe(this.auth.currentUserId(), this.name).take(1).subscribe(() => this.loadingOwe = false);
    this.lendList = this.debtifyDb.getLend(this.auth.currentUserId(), this.name);
    this.debtifyDb.getLend(this.auth.currentUserId(), this.name).take(1).subscribe(() => this.loadingLend = false);
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
          value: Math.abs(debt.Amount),
          type: 'number'
        },
        {
          name: 'Note',
          value: debt.Note,
          type: 'string'
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
            data["Currency"] = debt.Currency;
            data["Amount"] = parseFloat(data["Amount"]);             
            this.debtifyDb.editDebtDetail(this.auth.currentUserId(), type, debt.Id, data);
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
            this.debtifyDb.deleteDebtDetail(this.auth.currentUserId(), type, debt.Id);
          }
        }
      ]
    });
    deleteDebt.present();
  }

}
