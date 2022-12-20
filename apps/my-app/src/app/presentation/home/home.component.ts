import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ionic-arch-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
