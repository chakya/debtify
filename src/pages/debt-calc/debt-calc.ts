import { LendProvider } from './../../providers/lend/lend';
import { DebtListPage } from './../debt-list/debt-list';
import { DebtProvider } from './../../providers/debt/debt';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public debtDb: DebtProvider, public lendDb: LendProvider) {
    this.person = navParams.get("person");
    this.debtType = navParams.get("debtType");
  }

  amountDisplay:string='';
  prevNum:string='0';
  operator:string='';
  newEntry:boolean=true;
  currNum:string='0';
  onOperator:boolean=false;
  result:string=''
  toCalculate:string=''
  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtCalcPage');
  }


  updAmount(char){
    if (this.isNumber(char) || char==='%'){
        this.amountDisplay+=char
        this.onOperator=false
        this.amountDisplay=this.amountDisplay.substring(0, this.amountDisplay.length - 1)+char;
        if (char==='%'){
          this.toCalculate=this.amountDisplay.substring(0, this.amountDisplay.length - 1)+'/100';
        }
        else{
          this.toCalculate+=char
        }
    }
  else if(char!=='='){
    if (this.onOperator){
      this.amountDisplay=this.amountDisplay.substring(0, this.amountDisplay.length - 1)+char;
      this.toCalculate=this.toCalculate.substring(0, this.amountDisplay.length - 1)+char;
    }
    else{
      this.amountDisplay+=char
      this.toCalculate+=char
      this.onOperator=true
    }
  }
  this.calc()
  }

  calc(){
    try {
      this.result=eval(this.toCalculate)  
  }
  catch(err) {
  }
  }


  clear(){
    this.amountDisplay=''
    this.toCalculate=''
  }

  del(){
    this.amountDisplay=this.amountDisplay.substring(0, this.amountDisplay.length - 1);
    this.toCalculate=this.amountDisplay.substring(0, this.toCalculate.length - 1);
  }
  isNumber(char){
    var numbList=['0','1','2','3','4','5','6','7','8','9','.']
    var index=numbList.indexOf(char)
    if (index>=0){return true}
    else{return false}
  }

  send(){
    if (this.debtType === "owe") {
      this.debtDb.saveNewDebt({
        Amount: parseInt(this.result),
        Note: "test",
        To: this.person
      });
      this.navCtrl.setRoot(DebtListPage);
    } else {
      this.lendDb.saveNewLend({
        Amount: parseInt(this.result),
        Note: "test",
        From: this.person
      })
      this.navCtrl.setRoot(DebtListPage);
    }
  }

}
