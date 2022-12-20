import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponentRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, HomeComponentRoutingModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
