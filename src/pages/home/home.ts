import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DebtCalcPage } from '../debt-calc/debt-calc';
import { DebtListPage } from '../debt-list/debt-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openCalc(){
    this.navCtrl.push(DebtCalcPage);
  }

  openDebt(){
    this.navCtrl.push(DebtListPage)
  }
}
