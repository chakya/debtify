import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

/*
  Generated class for the DebtifyDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DebtifyDatabaseProvider {

  private users;
  private contact;
  private owe;
  private lend;

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {
    db.list("Contact/iAMtfnGLlsQaRmvfaGNhUOSUWVn1").valueChanges()
      .subscribe(data => {
        this.users = {};
        this.contact = data;
        console.log(this.contact);
        this.contact.forEach(element =>
          db.list("Users/" + element.Id).valueChanges().subscribe(data => {this.users[element.Id] = data; console.log(this.users);})
        )
      }
    );
    
    
  }

}
