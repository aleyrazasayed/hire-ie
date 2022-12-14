import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewJobPageRoutingModule } from './view-job-routing.module';

import { ViewJobPage } from './view-job.page';
import { MenuPageModule } from '../common/menu/menu.module';
import { MenuPage } from '../common/menu/menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewJobPageRoutingModule,
  ],
  declarations: [ViewJobPage, MenuPage]
})
export class ViewJobPageModule {}
