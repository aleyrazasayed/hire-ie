import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private subject = new Subject<any>();


  constructor(private db: AngularFirestore) { }

  createUser(user: any) {
    const userData = JSON.parse(JSON.stringify(user));
    return this.db.collection('user').add(userData);
  }

  getAllUsers(): Observable<any> {
    const users = this.db.collection<any>('user').snapshotChanges().pipe(
      map(actions => {
        return actions.map(
          c => ({
            postId: c.payload.doc.id,
            ...c.payload.doc.data()
          }));
      }));
    return users;
  }

  getUserbyId(id: string): Observable<any> {
    const userDetails = this.db.doc<any>('user/huuh').valueChanges();
    return userDetails;
  }

 getChangeUser(): Observable<any> {
        return this.subject.asObservable();
    }

    
    setUser() {
      this.subject.next(true);
  }
}
