import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantHomePage } from './applicant-home.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantHomePage
  },
  {
    path: 'saved-jobs',
    loadChildren: () => import('./saved-jobs/saved-jobs.module').then( m => m.SavedJobsPageModule)
  },
  {
    path: 'applied-jobs',
    loadChildren: () => import('./applied-jobs/applied-jobs.module').then( m => m.AppliedJobsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantHomePageRoutingModule {}
