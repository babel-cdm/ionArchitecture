import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@my-app/env';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  environmentName = environment.name
}
