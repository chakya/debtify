import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebtCalcPage } from './debt-calc';

@NgModule({
  declarations: [
    DebtCalcPage,
  ],
  imports: [
    IonicPageModule.forChild(DebtCalcPage),
  ],
})
export class DebtCalcPageModule {}
