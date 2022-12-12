import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPage } from '../common/menu/menu.page';
import { MenuPageModule } from '../common/menu/menu.module';



@NgModule({
  declarations: [MenuPage],
  imports: [
    CommonModule,
     MenuPageModule
  ],
  exports:[MenuPage]
})
export class SharedModule { }
