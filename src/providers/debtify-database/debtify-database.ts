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

interface Lend {
  Amount: number;
  Id: string;
  Note: string;
  Name?: any;
}

@Injectable()
export class DebtifyDatabaseProvider {

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  getContact() {
    return this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .switchMap((element: ContactFirebase[]) => Observable.combineLatest(element.map(data => {
        return this.db.object("Users/" + data.Id).valueChanges().map((element:Users) => {
          return element.Name;
        });
      }))
    )
  }

  getLendTotal(){
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .map((element: Lend[]) => element.map(data => data.Id).filter((v, i, a) => a.indexOf(v) === i))
      .switchMap(ids => Observable.combineLatest(ids.map(id => 
        this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
          ref => ref.orderByChild('Id').equalTo(id))
          .valueChanges()
          .map((element: Lend[]) => element.reduce((prev, curr) => {
            return {
              Id: id,
              Amount: prev.Amount + curr.Amount,
              Note: ""
            }
          }))      
          .switchMap((data: Lend) => {
            return this.db.object("Users/" + data.Id).valueChanges().map((element:Users) => {
              return {
                Amount: data.Amount,
                Id: data.Id,
                Name: element.Name,
                Note: data.Note
              };
            });
          })
      )))
  }

  getOweTotal(){
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .map((element: Lend[]) => element.map(data => data.Id).filter((v, i, a) => a.indexOf(v) === i))
      .switchMap(ids => Observable.combineLatest(ids.map(id => 
        this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
          ref => ref.orderByChild('Id').equalTo(id))
          .valueChanges()
          .map((element: Lend[]) => element.reduce((prev, curr) => {
            return {
              Id: id,
              Amount: prev.Amount + curr.Amount,
              Note: ""
            }
          }))
          .switchMap((data: Lend) => {
            return this.db.object("Users/" + data.Id).valueChanges().map((element:Users) => {
              return {
                Amount: data.Amount,
                Id: data.Id,
                Name: element.Name,
                Note: data.Note
              };
            });
          })
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

  getLend(id) {
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByChild('Id').equalTo(id))
      .valueChanges()
      .map((element: Lend[]) => element.map(data => {
        return {
          Amount: data.Amount * -1,
          Id: data.Id,
          Note: data.Note
        }
      }))
  }

  getOwe(id) {
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByChild('Id').equalTo(id))
      .valueChanges()
  }

  checkUsername(username: string) {
    username = username.toLowerCase();
    return this.db.object(`Usernames/${username}`).valueChanges();
  }

  registerUser(username, fullname, uid) {
    let user = {}
    user[uid] = {Username: username, Fullname: fullname};
    this.db.object("/Users").update(user);

    let uName = {}
    uName[username] = uid;
    this.db.object(`/Usernames`).update(uName);

  }

}
