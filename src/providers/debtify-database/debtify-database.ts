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

  getContact(id) {
    return this.db.list("Contact/" + id, 
      ref => ref.orderByValue())
      .valueChanges()
  }

  addContact(id, name) {
    console.log(name);
    this.db.list("Contact/" + id).push(name);
  }

  deleteContact(id, name) {
    this.db.list("Contact/" + id, 
      ref => ref.orderByValue().equalTo(name))
      .snapshotChanges()
      .take(1)
      .subscribe(data => {
        let key = data[0].key;
        console.log(key);
        this.db.object("Contact/" + id + "/" + key).remove();
      });
  }

  editContact(id, prvName, currName) {
    this.db.list("Contact/" + id, 
      ref => ref.orderByValue().equalTo(prvName))
      .snapshotChanges()
      .take(1)
      .subscribe(data => {
        let newName = {}
        let key = data[0].key;
        newName[key] = currName;
        this.db.object("Contact/" + id).update(newName);
      });
  }

  editDebtDetail(id, debtType, key, currObject) {
    let newObject = {}
    newObject[key] = currObject;
    this.db.object(debtType + "/" + id).update(newObject);
  }

  deleteDebtDetail(id, debtType, key) {
    console.log(debtType + "/"+ id + "/" + key);
    this.db.object(debtType + "/"+ id + "/" + key).remove();
  }

  getLendTotal(id) {
    return this.db.list("Lend/" + id,
      ref => ref.orderByChild("Name"))
      .valueChanges()
      .map((element: Debt[]) => 
        element.map(data => data.Name).filter((v, i, a) => a.indexOf(v) === i))
      .switchMap(names => Observable.combineLatest(names.map(name => 
        this.db.list("Lend/" + id, 
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

  getOweTotal(id) {
    return this.db.list("Owe/" + id,
      ref => ref.orderByChild("Name"))
      .valueChanges()
      .map((element: Debt[]) => 
        element.map(data => data.Name).filter((v, i, a) => a.indexOf(v) === i))
      .switchMap(names => Observable.combineLatest(names.map(name => 
        this.db.list("Owe/" + id, 
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

  getLend(id, name) {
    return this.db.list("Lend/" + id, 
      ref => ref.orderByChild('Name').equalTo(name))
      .valueChanges();
  }

  getOwe(id, name) {
    return this.db.list("Owe/" + id, 
      ref => ref.orderByChild('Name').equalTo(name))
      .valueChanges();
  }

  registerUser(fullname, uid) {
    let user = {}
    user[uid] = fullname;
    this.db.object("/Users").update(user);
  }

  addItem(id, type, name, amount, note, currency){
    let item={}
    console.log(type, name, amount)
    item["Amount"] = amount;
    item["Name"] = name;
    item["Note"] = note;
    item["Currency"] = currency;
    let promise = this.db.list(type + "/" + id).push(item);
    item["Id"] = promise.key;
    this.editDebtDetail(id, type, promise.key, item);
  }

}