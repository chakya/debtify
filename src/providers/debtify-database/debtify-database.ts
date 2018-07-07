import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/reduce';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

/*
  Generated class for the DebtifyDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface ContactFirebase {
  Id: string;
}

interface Users {
  Name: string;
}

interface Debt {
  Amount: number;
  Name: string;
  Note: string;
}

@Injectable()
export class DebtifyDatabaseProvider {

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  getContact() {
    return this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
  }

  addContact(name) {
    this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").push(name);
  }

  editContact(prvName, currName) {
    this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByValue().equalTo(prvName))
      .snapshotChanges()
      .subscribe(data => {
        let newName = {}
        let key = data[0].key;
        newName[key] = currName;
        this.db.object("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").update(newName);
      });
  }

  getLendTotal() {
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .map((element: Debt[]) => 
        element.map(data => data.Name).filter((v, i, a) => a.indexOf(v) === i))
      .switchMap(names => Observable.combineLatest(names.map(name => 
        this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
          ref => ref.orderByChild('Name').equalTo(name))
          .valueChanges()
          .map((element: Debt[]) => element.reduce((prev, curr) => {
            return {
              Name: name,
              Amount: prev.Amount + curr.Amount,
              Note: ""
            }
          }))
      )))
  }

  getOweTotal() {
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .map((element: Debt[]) => 
        element.map(data => data.Name).filter((v, i, a) => a.indexOf(v) === i))
      .switchMap(names => Observable.combineLatest(names.map(name => 
        this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
          ref => ref.orderByChild('Name').equalTo(name))
          .valueChanges()
          .map((element: Debt[]) => element.reduce((prev, curr) => {
            return {
              Name: name,
              Amount: prev.Amount + curr.Amount,
              Note: ""
            }
          }))
      )))
  }

  getDebtDetail(id) {
    return Observable.combineLatest(
      this.getLend(id),
      this.getOwe(id),
      (lendItems, oweItems)=> {
        return [...lendItems, ...oweItems]
      }
    );
  }

  getLend(name) {
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByChild('Name').equalTo(name))
      .valueChanges()
      .map((element: Debt[]) => element.map(data => {
        return {
          Amount: data.Amount * -1,
          Id: data.Name,
          Note: data.Note
        }
      }))
  }

  getOwe(name) {
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByChild('Name').equalTo(name))
      .valueChanges()
  }

  registerUser(fullname, uid) {
    let user = {}
    user[uid] = fullname;
    this.db.object("/Users").update(user);
  }

}
