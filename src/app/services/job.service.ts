import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, fromEvent, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private db: AngularFirestore) {}
  postJob(data: any): any {
    const jobData = JSON.parse(JSON.stringify(data));
    return this.db.collection('jobs').add(jobData);
  }

  saveJobs(data: any): any {
    const jobData = JSON.parse(JSON.stringify(data));
    return this.db.collection('savedJobs').add(jobData);
  }

  applyJob(data: any): any {
    const jobData = JSON.parse(JSON.stringify(data));
    return this.db.collection('applicants').add(jobData);
  }
  getAllJobs(): Observable<any> {
    const jobs = this.db
      .collection<any>('jobs')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            postId: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      );
    return jobs;
  }

  getSavedJobs(): Observable<any> {
    const jobs = this.db
      .collection<any>('savedJobs')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            postId: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      );
    return jobs;
  }

  getAppliedJobs(): Observable<any> {
    const jobs = this.db
      .collection<any>('applicants')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            docId: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      );
    return jobs;
  }

  getApplicants(job: any): Observable<any> {
    const jobs = this.db
      .collection<any>('applicants', (ref) =>
        ref
          .where('postId', '==', job.postId)
          .where('recruiterEmail', '==', job.recruiterEmail)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            docId: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        }),
        switchMap((data) => {
          const applicantIds = data
            .map((d) => d.email)
            .filter((v, i, a) => a.indexOf(v) === i);
            if(applicantIds.length===0)return of([]);
          return this.db
            .collection<any>('user', (ref) =>
              ref.where('email', 'in', applicantIds)
            )
            .snapshotChanges()
            .pipe(
              map((actions) => {
                return actions.map((c) => ({
                  postId: c.payload.doc.id,
                  ...c.payload.doc.data(),
                }));
              }),
              map((users) => {
                return data.map((d) => {
                  const user = users.find((u) => u.email === d.email);
                  return {
                    job: d,
                    user,
                  };
                });
              })
            );
        })
      );
    return jobs;
  }

  updateApplicantStatus(request: { job: any; status: string }):Observable<any> {
    return from(this.db
      .collection<any>('applicants')
      .doc(request.job.docId)
      .update({ status: request.status }));
  }
}
