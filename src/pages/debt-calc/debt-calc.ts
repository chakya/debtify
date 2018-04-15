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

  amountDisplay:string='0';
  prevNum:string='0';
  operator:string='';
  newEntry:boolean=true;
  currNum:string='0';

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebtCalcPage');
  }

  updAmount(char:string){
    if (this.isNumber(char)){
      //keep adding number
      if( !this.newEntry){
      this.amountDisplay+=char
      }
      //if you pressed operator it will reset the number display
      else {
        this.amountDisplay=char
        this.newEntry=false;
      }
    }
    else if(char=='='){
      this.currNum =this.amountDisplay
      try {
        this.amountDisplay=eval(this.prevNum+this.operator+this.currNum)  
    }
    catch(err) {
        this.amountDisplay='err'
        this.reset()
    }
      console.log(this.prevNum+this.operator+this.currNum)    
      this.operator='' 
    }

    //if operator was pressed
    else{
      if (this.newEntry===true){
        this.operator=char
      }
      else{
      this.currNum =this.amountDisplay
      if (this.operator!=='' ){ 
        console.log(this.prevNum,this.currNum)
        this.amountDisplay=eval(this.prevNum+this.operator+this.currNum)   
        this.operator='' 
      }
      this.operator=char
      this.prevNum= this.amountDisplay
      this.newEntry=true;
    }
    }

    if (!isFinite(parseInt(this.amountDisplay))){
      this.reset()
    }
  }

  reset(){
    this.newEntry=true
    this.prevNum=''
    this.currNum=''
    this.operator=''
  }

  clear(){
    this.amountDisplay='0'
    this.reset()
  }

  del(){
    this.amountDisplay=this.amountDisplay.substring(0, this.amountDisplay.length - 1);
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
        Amount: parseInt(this.amountDisplay),
        Note: "test",
        To: this.person
      });
      this.navCtrl.setRoot(DebtListPage);
    } else {
      this.lendDb.saveNewLend({
        Amount: parseInt(this.amountDisplay),
        Note: "test",
        From: this.person
      })
      this.navCtrl.setRoot(DebtListPage);
    }
  }

}
