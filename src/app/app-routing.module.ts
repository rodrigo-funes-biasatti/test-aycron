import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './shared/service/authguard.guard';
import { NwcGuard } from './shared/service/nwc.guard';
import { WarehousesResolver } from './shared/resolvers/warehouses.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthguardGuard]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'nearest-warehouse', loadChildren: () => import('./nearest-warehouse/nearest-warehouse.module').then(m => m.NearestWarehouseModule), canActivate: [AuthguardGuard, NwcGuard], resolve: { warehouses: WarehousesResolver }
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
