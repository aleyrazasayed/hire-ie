import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantHomePageRoutingModule } from './applicant-home-routing.module';

import { ApplicantHomePage } from './applicant-home.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MenuPage } from '../common/menu/menu.page';
import { ModalController } from '@ionic/angular';
import { MenuPageModule } from '../common/menu/menu.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApplicantHomePageRoutingModule,
    Ng2SearchPipeModule,
    MenuPageModule
  ],
  declarations: [ApplicantHomePage]
})
export class ApplicantHomePageModule {}
