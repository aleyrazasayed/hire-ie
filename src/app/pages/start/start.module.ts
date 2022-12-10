import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule
  ],
  declarations: [StartPage],
  providers: [SplashScreen ]
})
export class StartPageModule {}
