import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StartPage } from './../start/start.page';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-applicant-home',
  templateUrl: './applicant-home.page.html',
  styleUrls: ['./applicant-home.page.scss'],
})
export class ApplicantHomePage implements OnInit {
  jobList: any= [];
  isLoad = false;
  filterForm! : FormGroup
  filterTerm!: string;
  SearchJob = 'Search Job'
  constructor(public toastr: ToasterService,public vibration: Vibration,public route: Router,public jobService: JobService,public modalController: ModalController, public fb: FormBuilder) { }
  isAdded = true;
  ngOnInit() {
    this.filterForm = this.fb.group({
      _location:[''],
     company:[''],
     description:[''],
     job_type:[''],
     level:[''],
     salary:[''],
     title:[''],
     technologies:[''],
     responsibilities:[''],
     date:[new Date()]
});
    this.getAllJObs();
  }
  getAllJObs() {
    this.isLoad =  true;
    this.jobService.getAllJobs().subscribe(resp=>{
      console.log(resp)
      this.isLoad = false;
      this.jobList = resp;
      // this.jobList.forEach(el=>{
      //   this.jobList['isSaved'] = false;
      // })
    }),((err: any) => {
      this.toastr.presentToast('Something went wrong!','danger')
      this.vibration.vibrate(1000);
      console.log(err)
      this.isLoad =  false;

    });
  }

  viewJobs(i: number){
    this.route.navigate(['view-job'], {
      state: {
        object: this.jobList[i]
      }
    });
  }

  saveJobs(job: any, index: any){
    this.isLoad =  true;
    this.isAdded=!this.isAdded;
    this.jobList[index]['isSaved'] = !this.jobList[index]['isSaved']
    const requestObj = job;
    requestObj['email'] = localStorage.getItem('email'); 
    this.jobService.saveJobs(requestObj).then(() => {
    this.isLoad =  false;

      this.toastr.presentToast(this.jobList[index]['isSaved'] ? 'Job saved successfully!' : 'Job removed successfully','success')
      this.vibration.vibrate(1000);
    }).catch((err: any) => {
      this.toastr.presentToast('Something went wrong!','danger')
      this.vibration.vibrate(1000);
      console.log(err)
      this.isLoad =  false;

    });
  }

  async openFilter() {
  //   const modal = await this.modalController.create({
  //   component: FilterPopupPage
  //   });
  //   return await modal.present();
  //  }
  }
}
