import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';  
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the DebtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DebtProvider {

  private debt: AngularFireList<any>;

  constructor(public db: AngularFireDatabase, public auth: AuthProvider) {
    this.debt = this.db.list(`/Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1`);
    /*
    let userId = auth.currentUserId();
    this.debt = this.db.list(`/fromDebt/${userId}`).valueChanges();
    */
  }

  getDebt() {
    return this.debt.valueChanges();
  }

  saveNewDebt(debt){
    this.debt.push(debt);
  }

  

}
