import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControlName, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.page.html',
  styleUrls: ['./recruiter-home.page.scss'],
})
export class RecruiterHomePage implements OnInit {
  pageName = 'Post Job'
  postJobForm!: FormGroup
  constructor(public router:Router, public vibration: Vibration,public jobService: JobService,public fb: FormBuilder, public toastr:ToasterService) { }

  ngOnInit() {
    this.postJobForm = this.fb.group({
           _location:[''],
          company:[''],
          description:[''],
          job_type:[''],
          level:[''],
          salary:[''],
          title:[''],
          technologies:[''],
          responsibilities:[''],
          date:[new Date()],
          isSaved:[false],
          isApplied:[false],
          recruiterEmail:[localStorage.getItem('email')]
    });
  }

  postJob(){
    console.log(this.postJobForm.value['date'])
    this.jobService.postJob(this.postJobForm.value).then(() => {
      this.vibration.vibrate(1000);
      this.toastr.presentToast('Job posted successfully!','success')
      this.postJobForm.reset();
    }).catch((err: any) => {
      this.vibration.vibrate(1000);
      this.toastr.presentToast('Job posted successfully!','danger')
      console.log(err)
    });
  }


}
