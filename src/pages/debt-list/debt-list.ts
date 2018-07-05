import { DetailPage } from './../detail/detail';
import { DebtifyDatabaseProvider } from './../../providers/debtify-database/debtify-database';
import { ContactPage } from './../contact/contact';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  oweList: Observable<any>;
  lendList: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public debtifyDb: DebtifyDatabaseProvider) { 
    this.oweList = debtifyDb.getOweTotal();
    this.lendList = debtifyDb.getLendTotal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtListPage');
  }

  addNewItem() {
    this.navCtrl.push(ContactPage, {
      debtType: this.debtType
    });
  }

  userDetail(user) {
    console.log(user.Id);
    this.navCtrl.push(DetailPage, {
      Id: user.Id
    });
  }

}
