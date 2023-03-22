import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NearestWarehouseRoutingModule } from './nearest-warehouse-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CalculatedComponent } from './calculated/calculated.component';


@NgModule({
  declarations: [
    CalculatedComponent
  ],
  imports: [
    CommonModule,
    NearestWarehouseRoutingModule,
    SharedModule
  ]
})
export class NearestWarehouseModule { }
