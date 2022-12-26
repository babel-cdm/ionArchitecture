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

const routes: Routes = [
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
