import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/take'; 
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the DebtifyDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface Debt {
  Amount: number;
  Name: string;
  Note: string;
  Currency: string;
}

@Injectable()
export class DebtifyDatabaseProvider {

  constructor(public db: AngularFireDatabase) {

  }

  getContact() {
    return this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByValue())
      .valueChanges()
  }

  addContact(name) {
    console.log(name);
    this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").push(name);
  }

  deleteContact(name) {
    this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByValue().equalTo(name))
      .snapshotChanges()
      .take(1)
      .subscribe(data => {
        let key = data[0].key;
        console.log(key);
        this.db.object("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1/"+key).remove();
      });
  }

  editContact(prvName, currName) {
    this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1", 
      ref => ref.orderByValue().equalTo(prvName))
      .snapshotChanges()
      .take(1)
      .subscribe(data => {
        let newName = {}
        let key = data[0].key;
        newName[key] = currName;
        this.db.object("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").update(newName);
      });
  }

  editDebtDetail(debtType, key, currObject) {
    let newObject = {}
    newObject[key] = currObject;
    this.db.object(debtType + "/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").update(newObject);
  }

  deleteDebtDetail(debtType, key) {
    console.log(debtType + "/iAMtfnGLlsQaRmvfaGNhUOSUWVn1/" + key);
    this.db.object(debtType + "/iAMtfnGLlsQaRmvfaGNhUOSUWVn1/" + key).remove();
  }

  getLendTotal() {
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1",
      ref => ref.orderByChild("Name"))
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
              Note: "",
              Currency: prev.Currency
            }
          }))
      )))
  }

  getOweTotal() {
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1",
      ref => ref.orderByChild("Name"))
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
              Note: "",
              Currency: prev.Currency
            }
          }))
      )))
  }

  getLend(name) {
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1/", 
      ref => ref.orderByChild('Name').equalTo(name))
      .valueChanges();
  }

  getOwe(name) {
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1/", 
      ref => ref.orderByChild('Name').equalTo(name))
      .valueChanges();
  }

  registerUser(fullname, uid) {
    let user = {}
    user[uid] = fullname;
    this.db.object("/Users").update(user);
  }

  addItem(type, name, amount, note, currency){
    let item={}
    console.log(type, name, amount)
    item["Amount"] = amount;
    item["Name"] = name;
    item["Note"] = note;
    item["Currency"] = currency;
    let promise = this.db.list(type + "/" + "iAMtfnGLlsQaRmvfaGNhUOSUWVn1").push(item);
    item["Id"] = promise.key;
    this.editDebtDetail(type, promise.key, item);
  }

}