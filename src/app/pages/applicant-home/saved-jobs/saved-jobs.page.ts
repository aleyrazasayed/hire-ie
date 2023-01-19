import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { JobService } from 'src/app/services/job.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.page.html',
  styleUrls: ['./saved-jobs.page.scss'],
})
export class SavedJobsPage implements OnInit {
  isLoad = true;
  pageName = 'Saved Jobs';
  jobList: any = [];
  constructor(
    public toastr: ToasterService,
    public route: Router,
    public jobService: JobService,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getSavedJObs();
  }

  getSavedJObs() {
    this.isLoad = true;
    this.jobService.getSavedJobs().subscribe((resp) => {
      console.log(resp);
      this.isLoad = false;
      this.jobList = resp;
      this.jobList = this.jobList.filter(
        (ele: { [x: string]: string | null }) =>
          ele['email'] === localStorage.getItem('email')
      );
    }),
      (err: any) => {
        this.toastr.presentToast('Something went wrong!', 'danger');
        console.log(err);
        this.isLoad = false;
      };
  }

  viewJobs(i: any) {
    this.route.navigate(['view-job'], {
      state: {
        object: this.jobList[i],
      },
    });
  }

  removeJob(index: any) {}
}
