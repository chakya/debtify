import { UtilsProvider } from './../../providers/utils/utils';
import { AuthProvider } from './../../providers/auth/auth';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public utils: UtilsProvider , public auth: AuthProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.utils.createLoading();
    this.auth.loginUser(this.user.email, this.user.password)
      .then( user => {
        if (!user.emailVerified) {
          this.auth.logoutUser();
          this.utils.dismissLoading().then(() => this.utils.createAlert("Please verify your email", "OK"));
        } else {
          this.navCtrl.setRoot(HomePage);
        }
      }, error => {
        this.utils.dismissLoading().then(() => this.utils.createAlert(error.message, "OK"));
      });
  }
  /*
  login() {

  }*/

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.auth.resetPassword(data.email)
              .then((user) => {
                this.utils.createAlert("We just sent you a reset link to your email", "OK");
              }, (error) => {
                this.utils.createAlert(error.message, "OK");
              });
          }
        }
      ]
    });
    forgot.present();
  }

}
