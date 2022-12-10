import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  // {
  //   path: 'recruiter-home',
  //   loadChildren: () => import('./pages/recruiter-home/recruiter-home.module').then( m => m.RecruiterHomePageModule)
  // },
  // {
  //   path: 'posted-jobs',
  //   loadChildren: () => import('./pages/recruiter-home/posted-jobs/posted-jobs.module').then( m => m.PostedJobsPageModule)
  // },
  // {
  //   path: 'applicant-home',
  //   loadChildren: () => import('./pages/applicant-home/applicant-home.module').then( m => m.ApplicantHomePageModule)
  // },
  // {
  //   path: 'saved-jobs',
  //   loadChildren: () => import('./pages/applicant-home/saved-jobs/saved-jobs.module').then( m => m.SavedJobsPageModule)
  // },
  {
    path: 'menu',
    loadChildren: () => import('./pages/common/menu/menu.module').then( m => m.MenuPageModule)
  },
  // {
  //   path: 'applied-jobs',
  //   loadChildren: () => import('./pages/applicant-home/applied-jobs/applied-jobs.module').then( m => m.AppliedJobsPageModule)
  // },
  // {
  //   path: 'view-job',
  //   loadChildren: () => import('./pages/view-job/view-job.module').then( m => m.ViewJobPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
