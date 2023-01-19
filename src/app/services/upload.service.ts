import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';

import { Observable, Subject } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(
    file: any,
    postId: string
  ): Observable<UploadTaskSnapshot | undefined> {
    const filePath = postId + '/' + file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    return task.snapshotChanges();
  }
}
