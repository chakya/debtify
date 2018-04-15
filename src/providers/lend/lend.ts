import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the LendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LendProvider {

  private lend: Observable<any>

  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth) {
    this.lend = this.db.list("toDebt/0").valueChanges();
    /*
    let userId = auth.currentUserId();
    this.lend = this.db.list(`toDebt/${userId}`).valueChanges();
    */
  }

  getLend() {
    return this.lend;
  }

}
