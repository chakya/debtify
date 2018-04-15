import { ContactPage } from './../contact/contact';
import { DebtProvider } from './../../providers/debt/debt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LendProvider } from '../../providers/lend/lend';
import { Observable } from 'rxjs/Observable';
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
  debtList: Observable<any>;
  lendList: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public debtData: DebtProvider, public lendData: LendProvider) { 
    this.debtList = debtData.getDebt();
    this.lendList = lendData.getLend();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtListPage');
  }

  addNewItem() {
    this.navCtrl.push(ContactPage, {
      debtType: this.debtType
    });
  }

}
