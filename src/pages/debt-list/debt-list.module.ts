import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebtListPage } from './debt-list';

@NgModule({
  declarations: [
    DebtListPage,
  ],
  imports: [
    IonicPageModule.forChild(DebtListPage),
  ],
})
export class DebtListPageModule {}
