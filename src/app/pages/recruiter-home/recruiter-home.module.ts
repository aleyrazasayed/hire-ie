import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecruiterHomePageRoutingModule } from './recruiter-home-routing.module';

import { RecruiterHomePage } from './recruiter-home.page';
import { MenuPage } from '../common/menu/menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RecruiterHomePageRoutingModule
  ],
  declarations: [RecruiterHomePage,MenuPage]
})
export class RecruiterHomePageModule {}
