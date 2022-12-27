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

import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTES.HOME,
    pathMatch: 'full'
  },
  {
    path: APP_ROUTES.HOME,
    component: HomeComponent
  },
  {
    path: APP_ROUTES.LOGIN,
    loadChildren: () => import('@my-app/login/presentation/login.module').then( m => m.LoginModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    HomeModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
