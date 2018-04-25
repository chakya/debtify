import { DebtListPage } from './../debt-list/debt-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  person: any;
  debtType: string;
  amountDisplay: string = '';
  result: string = ''
  toCalculate: string = ''
  onOperator: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = navParams.get("person");
    this.debtType = navParams.get("debtType");
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
    
  }

}
