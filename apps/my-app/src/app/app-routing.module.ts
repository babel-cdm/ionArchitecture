import { NgModule } from '@angular/core';

import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
  Routes
} from '@angular/router';

import {
  IonicRouteStrategy
} from '@ionic/angular';

import { APP_ROUTES } from './app-routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTES.HOME,
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeComponentModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
