import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecruiterHomePage } from './recruiter-home.page';

const routes: Routes = [
  {
    path: '',
    component: RecruiterHomePage
  },
  {
    path: 'posted-jobs',
    loadChildren: () => import('./posted-jobs/posted-jobs.module').then( m => m.PostedJobsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterHomePageRoutingModule {}
