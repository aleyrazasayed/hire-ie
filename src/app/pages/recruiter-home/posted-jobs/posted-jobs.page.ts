import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-posted-jobs',
  templateUrl: './posted-jobs.page.html',
  styleUrls: ['./posted-jobs.page.scss'],
})
export class PostedJobsPage implements OnInit {
pageName = 'Posted Jobs'
isLoad = true;
jobList: any = []
constructor(public toastr: ToasterService,public route: Router,public jobService: JobService, public fb: FormBuilder) { }

ngOnInit() {
  this.getPostedJObs();
}


getPostedJObs() {
  this.isLoad =  true;
  this.jobService.getAllJobs().subscribe(resp=>{
    console.log(resp)
    this.isLoad = false;
    this.jobList = resp;
    this.jobList = this.jobList.filter((ele: { [x: string]: string | null; })=> ele['recruiterEmail'] === localStorage.getItem('email'));
  }),((err: any) => {
    this.toastr.presentToast('Something went wrong!','danger')
    console.log(err)
    this.isLoad =  false;
  });
}

viewJobs(i: any){
  this.route.navigate(['view-job'], {
    state: {
      object: this.jobList[i]
    }
  });
}

removeJob(index: any){

}
}
