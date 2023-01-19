import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InAppNotificationService {
  constructor(private db: AngularFirestore) {}

  getNotifications(): Observable<any> {
    const isRecruiter = localStorage.getItem('isRecruiter');
    const notifications = this.db
      .collection<any>('notifications', (ref) =>
        ref
          .where('forRecruiter', '==', isRecruiter==='true')
          .where('isRead', '==', false)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            notificationId: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      );
    return notifications;
  }

  updateNotification(res: any) {
    const docId = res.notificationId;
    delete res.notificationId;
    this.db.collection('notifications').doc(docId).update(res);
  }

  saveNotification(notification: any): Observable<any> {
    const notificationData = JSON.parse(JSON.stringify(notification));
    return from(this.db.collection('notifications').add(notificationData));
  }
}
