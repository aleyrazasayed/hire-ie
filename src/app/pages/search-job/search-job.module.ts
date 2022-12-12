import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchJobPageRoutingModule } from './search-job-routing.module';

import { SearchJobPage } from './search-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchJobPageRoutingModule
  ],
  declarations: [SearchJobPage]
})
export class SearchJobPageModule {}
