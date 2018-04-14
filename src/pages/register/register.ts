import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireAuth} from "angularfire2/auth"
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

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
  user = {} as User;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public utils: UtilsProvider, public authData: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register() {
    this.utils.createLoading();
    this.authData.signupUser(this.user.email, this.user.password)
      .then(user => {
        user.sendEmailVerification().then(() => {
          this.utils.dismissLoading().then(() => this.utils.createAlert("Please verify your email", "OK"));
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
