import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatedComponent } from './calculated/calculated.component';

const routes: Routes = [
  {
    path: '', component: CalculatedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NearestWarehouseRoutingModule { }
