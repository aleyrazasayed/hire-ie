import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostedJobsPage } from './posted-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: PostedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostedJobsPageRoutingModule {}
