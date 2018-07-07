import { DebtifyDatabaseProvider } from './../../providers/debtify-database/debtify-database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  debtList: Observable<any>;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public debtifyDb: DebtifyDatabaseProvider) {
    this.name = navParams.get("Name");
    this.debtList = debtifyDb.getDebtDetail(this.name);
  }

  ionViewDidLeave(){
   console.log('ionViewDidLeave DetailPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
