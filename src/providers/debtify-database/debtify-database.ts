import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
  User: any;
}

@Injectable()
export class DebtifyDatabaseProvider {

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  getContact() {
    return this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .switchMap((element: ContactFirebase[]) => Observable.combineLatest(element.map(data => {
        return this.db.list("Users/" + data.Id).valueChanges();
      }))
    )
  }

  getLend(){
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .switchMap((element: Lend[]) => Observable.combineLatest(element.map(data => {
        return this.db.object("Users/" + data.Id).valueChanges().map((element:Users) => {
          return {
            Amount: data.Amount,
            Id: data.Id,
            Name: element.Name,
            Note: data.Note
          };
        });
      })))
  }

  getOwe(){
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .switchMap((element: Lend[]) => Observable.combineLatest(element.map(data => {
        return this.db.object("Users/" + data.Id).valueChanges().map((element:Users) => {
          return {
            Amount: data.Amount,
            Id: data.Id,
            Name: element.Name,
            Note: data.Note
          };
        });
      })))
  }

  checkUsername(username: string) {
    username = username.toLowerCase();
    return this.db.object(`Usernames/${username}`).valueChanges();
  }

  updateUsername(username: string) {
    let data = {}
    data[username] = "iAMtfnGLlsQaRmvfaGNhUOSUWVn1"

    this.db.object("/Users/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").update({"username": username})
    this.db.object(`/Usernames`).update(data)
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