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
    redirectTo: APP_ROUTES.LOGIN,
    pathMatch: 'full'
  },
  {
    path: APP_ROUTES.LOGIN,
    loadChildren: () => import('@app/login/presentation/login.module').then((m) => m.LoginModule),
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
