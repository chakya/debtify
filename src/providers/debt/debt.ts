import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';  
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the DebtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DebtProvider {

  private debt: Observable<any>;

  constructor(public db: AngularFireDatabase, public auth: AuthProvider) {
    this.debt = this.db.list(`/fromDebt/0`).valueChanges();
    /*
    let userId = auth.currentUserId();
    this.debt = this.db.list(`/fromDebt/${}`).valueChanges();
    */
  }

  getDebt() {
    return this.debt;
  }

  

}
