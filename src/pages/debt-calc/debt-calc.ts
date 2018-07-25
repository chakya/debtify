import { AuthProvider } from './../../providers/auth/auth';
import { AppPreferences } from '@ionic-native/app-preferences';
import { CURRENCY } from './currency';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DebtifyDatabaseProvider } from '../../providers/debtify-database/debtify-database';
import { DebtListPage } from '../debt-list/debt-list';

/**
 * Generated class for the DebtCalcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-debt-calc',
  templateUrl: 'debt-calc.html',
})
export class DebtCalcPage {

  amountDisplay: string = '';
  result: string = ''
  toCalculate: string = ''
  onOperator: boolean = false;
  type:string;
  name:string;
  currency;
  currencyList = CURRENCY;
  selectOptions = {
    title: 'Currency',
    subTitle: 'Select the currency'
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthProvider,
    public debtifyDb: DebtifyDatabaseProvider,
    public alertCtrl: AlertController,
    private appPreferences: AppPreferences) {
    this.appPreferences.fetch("currency", "symbol")
      .then(symbol => this.currency = symbol)
      .catch(error => console.log(error));
    this.name = navParams.get("Name");
    this.type = navParams.get("Type");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtCalcPage');
  }

  updAmount(char){
    if (this.isNumber(char) || char === '%') {
        if (this.result) {
          this.result = "";
          this.toCalculate = "";
        }
        if (this.onOperator) {
          this.amountDisplay += " " + char
        } else {
          this.amountDisplay += char
        }
        this.onOperator = false
        this.amountDisplay = this.amountDisplay.substring(0, this.amountDisplay.length - 1) + char;
        if (char === '%') {
          this.toCalculate = this.amountDisplay.substring(0, this.amountDisplay.length - 1) + '/100';
        } else {
          this.toCalculate += char
        }
    } else if(char !== '=') {
      if (this.result) {
        this.amountDisplay = this.result;
        this.result = "";
      }
      if (this.onOperator) {
        this.amountDisplay = this.amountDisplay.substring(0, this.amountDisplay.length - 1) + char;
        this.toCalculate = this.toCalculate.substring(0, this.amountDisplay.length - 1) + char;
      } else {
        this.amountDisplay += " " + char 
        this.toCalculate +=  char 
        this.onOperator = true
      }
    } else {
      this.calc()
    }
  }

  del() {
    this.amountDisplay = this.amountDisplay.substring(0, this.amountDisplay.length - 1);
    if (this.amountDisplay.charAt(this.amountDisplay.length - 1) === " ") {
      this.amountDisplay = this.amountDisplay.substring(0, this.amountDisplay.length - 1);
    }
    this.toCalculate = this.toCalculate.substring(0, this.toCalculate.length - 1);
    this.onOperator = false;
  }

  calc() {
    try {
      this.result = eval(this.toCalculate);
      this.amountDisplay = ""
      this.toCalculate = this.result;
    }
    catch(err) {
    }
  }

  clear() {
    this.amountDisplay = "";
    this.toCalculate = "";
    this.result = "";
  }

  isNumber(char) {
    var numbList = ['0','1','2','3','4','5','6','7','8','9','.'];
    var index = numbList.indexOf(char);
    return index >= 0;
  }

  send() {
    let prompt = this.alertCtrl.create({
      title: 'Add a detail',
      inputs: [
        {
          name: 'Note'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("cancelled");
          }
        },
        {
          text: 'Submit',
          handler: (data) => {
            let amount = parseFloat(this.result) > 0 ? this.result : this.amountDisplay;
            this.debtifyDb.addItem(this.auth.currentUserId(), this.type, this.name, parseFloat(amount), data.Note, this.currency);
            this.appPreferences.store("currency", "symbol", this.currency)
              .then(console.log)
              .catch(console.log);
            this.navCtrl.setRoot(DebtListPage);
          }
        }
      ]
    });
    prompt.present();
  }

}
