import { NgModule } from '@angular/core';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StartPageRoutingModule
  ],
  declarations: [StartPage],
  providers: [SplashScreen ]
})
export class StartPageModule {}
