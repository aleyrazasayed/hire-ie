import { ToasterService } from 'src/app/services/toaster.service';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.page.html',
  styleUrls: ['./view-job.page.scss'],
})
export class ViewJobPage implements OnInit {
  pageName = 'View Job'
  currentObj : any;
  isApplied = false


  constructor(public route: Router, public toastr: ToasterService, public jobService: JobService) { 
    
  }

  ngOnInit() {
    this.currentObj = this.route.getCurrentNavigation()?.extras?.state;
    this.currentObj = this.currentObj['object']
  }
  applyJob(obj: any){
    const reqObj =  obj;
    reqObj['email'] = localStorage.getItem('email')
    this.jobService.applyJob(reqObj).then(() => {
       this.toastr.presentToast('Applied for job successfully, recruiter will contact you on your registered email', 'success');
       this.isApplied = true;
    });
  }



}


