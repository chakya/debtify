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
    this.lendList = debtifyDb.getLendTotal();
    this.oweList = debtifyDb.getOweTotal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtListPage');
  }

  addNewItem(type) {
    
  }

  userDetail(user) {
    console.log(user.Name);
    this.navCtrl.push(DetailPage, {
      Name: user.Name
    });
  }

}
