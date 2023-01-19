import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPageModule } from '../common/menu/menu.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from '../common/menu/menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPage,
    ReactiveFormsModule,
  ],
  declarations: [
    MenuPage,
  ],
})
export class SharedModule {}
