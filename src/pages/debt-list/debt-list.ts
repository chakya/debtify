import { AuthProvider } from './../../providers/auth/auth';
import { AdMobPro } from '@ionic-native/admob-pro';
import { DebtifyDatabaseProvider } from './../../providers/debtify-database/debtify-database';
import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SelectContactPage } from '../select-contact/select-contact';
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
  debtType:string = "lend";
  loading:boolean = true;
  oweList: Observable<any>;
  lendList: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public debtifyDb: DebtifyDatabaseProvider,
    public auth: AuthProvider,
    private platform: Platform,
    private admob: AdMobPro) {
    this.lendList = this.debtifyDb.getLendTotal(auth.currentUserId());
    this.oweList = this.debtifyDb.getOweTotal(auth.currentUserId());
    this.debtifyDb.getLendTotal(this.auth.currentUserId()).take(1).subscribe(() => this.loading = false);
    this.platform.ready().then(() => {
      var admobid = {
          banner: 'ca-app-pub-1435565424178238/9468361331',
      };

      this.admob.createBanner({
          adId: admobid.banner,
          adSize : "BANNER",
          autoShow: true,
          position: this.admob.AD_POSITION.BOTTOM_CENTER
      }).then().catch(() => console.log("cordova is not supported"));
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtListPage');
  }

  addNewItem(type) {
    this.navCtrl.push(SelectContactPage, {
      Type: type
    });
  }

  userDetail(user) {
    console.log(user.Name);
    this.navCtrl.push(DetailPage, {
      Name: user.Name
    });
  }

  changeTab(type) {
    this.loading = true;
    if (type == "lend") {
      this.debtifyDb.getLendTotal(this.auth.currentUserId()).take(1).subscribe(() => this.loading = false);
    } else {
      this.debtifyDb.getOweTotal(this.auth.currentUserId()).take(1).subscribe(() => this.loading = false);
    }
  }

}
