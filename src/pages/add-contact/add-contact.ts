import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DebtifyDatabaseProvider } from '../../providers/debtify-database/debtify-database';

/**
 * Generated class for the AddContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {
  searchInput :string   //an observable
  timeout:any=null;
  usernameAvailable:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public debtifyDb: DebtifyDatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

  waitToCheck(event){
    clearTimeout(this.timeout);

    // Make a new timeout set to go off in 800ms
    this.timeout = setTimeout(()=>this.checkUsername(), 2000);
  }

  checkUsername(){
    clearTimeout(this.timeout);
    console.log('searching')

    if (this.searchInput.length < 6) {
      this.usernameAvailable = false;
      return;
    }
    this.debtifyDb.checkUsername(this.searchInput).subscribe(username => {
      console.log(username)
      this.usernameAvailable = !username;
    })
  }
  

}
