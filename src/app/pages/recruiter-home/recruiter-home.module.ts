import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecruiterHomePageRoutingModule } from './recruiter-home-routing.module';

import { RecruiterHomePage } from './recruiter-home.page';
import { MenuPage } from '../common/menu/menu.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RecruiterHomePageRoutingModule,
    SharedModule
  ],
  declarations: [RecruiterHomePage]
})
export class RecruiterHomePageModule {}
