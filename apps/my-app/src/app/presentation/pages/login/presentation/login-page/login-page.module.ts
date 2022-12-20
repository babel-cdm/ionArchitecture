import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LoginPageComponent } from './login-page.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
})
export class LoginPageComponentModule {}
