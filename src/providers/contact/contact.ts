import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  private contact: Observable<any>;

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {
    this.contact = this.db.list("Contact/0").valueChanges();
  }

  getContact() {
    return this.contact;
  }

}
