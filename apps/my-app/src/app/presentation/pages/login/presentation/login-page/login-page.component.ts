import { Component } from '@angular/core';

import { environment } from '@env';

@Component({
  selector: 'ionic-arch-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  environmentName = environment.name
}
