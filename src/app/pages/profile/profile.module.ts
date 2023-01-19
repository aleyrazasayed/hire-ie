import { NgModule } from '@angular/core';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { MenuPageModule } from '../common/menu/menu.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
