import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the DebtListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-debt-list',
  templateUrl: 'debt-list.html',
})
export class DebtListPage {
  debtType:string="lend"
  debtList:any;
  lendList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtListPage');

    const lendRef: firebase.database.Reference = firebase.database().ref(`/toDebt/0/`);
    lendRef.on('value', personSnapshot => {
      this.lendList = personSnapshot.val();
    });

    const debtRef: firebase.database.Reference = firebase.database().ref(`/fromDebt/0/`);
    debtRef.on('value', personSnapshot => {
      this.debtList = personSnapshot.val();
    });
  }

}
