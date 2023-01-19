import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantHomePageRoutingModule } from './applicant-home-routing.module';

import { ApplicantHomePage } from './applicant-home.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, ApplicantHomePageRoutingModule, Ng2SearchPipeModule],
  declarations: [ApplicantHomePage],
})
export class ApplicantHomePageModule {}
