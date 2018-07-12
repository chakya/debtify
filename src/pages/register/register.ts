import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { DebtifyDatabaseProvider } from '../../providers/debtify-database/debtify-database';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  fullname: string;
  email: string;
  password: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public utils: UtilsProvider, public authData: AuthProvider,
    public debtifyDb: DebtifyDatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.utils.createLoading();
    this.authData.signupUser(this.email, this.password)
      .then(user => {
        user.sendEmailVerification().then(() => {
          this.utils.dismissLoading().then(() => this.utils.createAlert("Please verify your email", "OK", () => {
            this.navCtrl.setRoot(LoginPage);
            this.debtifyDb.registerUser(this.fullname, user.uid);
          }));
        }, (error) => {
          this.utils.dismissLoading().then(() => this.utils.createAlert(error.message, "OK"));
        });
      }, (error) => {
        this.utils.dismissLoading().then(() => this.utils.createAlert(error.message, "OK"));
      }
    )
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
