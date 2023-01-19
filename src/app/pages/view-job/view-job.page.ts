import { ToasterService } from 'src/app/services/toaster.service';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { InAppNotificationService } from 'src/app/services/inapp.notification.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.page.html',
  styleUrls: ['./view-job.page.scss'],
})
export class ViewJobPage implements OnInit {
  pageName = 'View Job';
  currentObj: any;
  applicants: any[] = [];
  isApplied = false;
  isRecruiter = false;

  constructor(
    public route: Router,
    public toastr: ToasterService,
    public jobService: JobService,
    private readonly notificationService: InAppNotificationService
  ) {
    this.isRecruiter = localStorage.getItem('isRecruiter') === 'true';
  }

  ngOnInit() {
    this.currentObj = this.route.getCurrentNavigation()?.extras?.state;
    this.currentObj = this.currentObj['object'];
    if (this.isRecruiter) this.getJobApplicants();
  }
  applyJob(obj: any) {
    const reqObj = obj;
    reqObj['email'] = localStorage.getItem('email');
    reqObj['status'] = 'pending';
    this.jobService.applyJob(reqObj).then(() => {
      const payload = {
        forRecruiter: true,
        title: `New Application from ${reqObj.email}`,
        body: `${reqObj.email} has applied for ${reqObj.title} job`,
        payload: reqObj,
        isRead: false,
      };
      this.notificationService.saveNotification(payload);
      this.toastr.presentToast(
        'Applied for job successfully, recruiter will contact you on your registered email',
        'success'
      );
      this.isApplied = true;
    });
  }

  getJobApplicants() {
    this.jobService
      .getApplicants(this.currentObj)
      .pipe(
        tap((res) => {
          console.log(res);
          this.applicants = res;
        })
      )
      .subscribe();
  }

  acceptApplicant(applicant: any) {
    const request = {
      job: applicant.job,
      status: 'accepted',
    };
    this.jobService
      .updateApplicantStatus(request)
      .pipe(
        tap(() => {
          const payload = {
            forRecruiter: false,
            title: `Application accepted for ${applicant.job.title}`,
            body: `${applicant.job.recruiterEmail} has accepted your application for ${applicant.job.title} job`,
            payload: applicant.job,
            isRead: false,
          };
          this.notificationService.saveNotification(payload);
          this.toastr.presentToast(
            'Application accepted successfully',
            'success'
          );
          this.route.navigate(['posted-jobs']);
        })
      )
      .subscribe();
  }
  rejectApplicant(applicant: any) {
    const request = {
      job: applicant.job,
      status: 'rejected',
    };
    this.jobService
      .updateApplicantStatus(request)
      .pipe(
        tap(() => {
          const payload = {
            forRecruiter: false,
            title: `Application rejected for ${applicant.job.title}`,
            body: `${applicant.job.recruiterEmail} has rejected your application for ${applicant.job.title} job`,
            payload: applicant.job,
            isRead: false,
          };
          this.notificationService.saveNotification(payload);
          this.toastr.presentToast(
            'Application rejected successfully',
            'success'
          );
          this.route.navigate(['posted-jobs']);
        })
      )
      .subscribe();
  }
}
