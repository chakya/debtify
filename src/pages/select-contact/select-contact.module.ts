import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectContactPage } from './select-contact';

@NgModule({
  declarations: [
    SelectContactPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectContactPage),
  ],
})
export class SelectContactPageModule {}
