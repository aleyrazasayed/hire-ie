import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchJobPage } from './search-job.page';

const routes: Routes = [
  {
    path: '',
    component: SearchJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchJobPageRoutingModule {}
