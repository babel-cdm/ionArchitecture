import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
