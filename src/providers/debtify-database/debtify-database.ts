import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
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

  private users;
  private contact;
  private owe;
  private lend;

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {

  }
/*
  initiate() {
    console.log("test");
    this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").valueChanges().subscribe(data => {
      this.users = {};
      this.contact = data;
      console.log(this.contact);
      this.contact.forEach(element =>
        this.db.list("Users/" + element.Id).valueChanges().subscribe(data => {
          this.users[element.Id] = data[0];
          console.log(data);
        })
      )
    });

    this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").valueChanges().subscribe(data => {
      this.lend = data;
      console.log(this.lend);
    });

    this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").valueChanges().subscribe(data => {
      this.owe = data;
      console.log(this.owe);
    });
  }
  */
  getContact() {
    return this.db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .switchMap((element: ContactFirebase[]) => Observable.combineLatest(element.map(data => {
        return this.db.list("Users/" + data.Id).valueChanges();
      }))
    )
  }

  getLend(): Observable<Lend[]>{
    return this.db.list("Lend/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .map((items: Lend[]) => {
        items.forEach(item => item.User = this.db.object("Users/" + item.Id).valueChanges());
        return items;
      });
  }

  getOwe(): Observable<Lend[]>{
    return this.db.list("Owe/iAMtfnGLlsQaRmvfaGNhUOSUWVn1")
      .valueChanges()
      .map((items: Lend[]) => {
        items.forEach(item => item.User = this.db.object("Users/" + item.Id).valueChanges());
        return items;
      });
  }

}
