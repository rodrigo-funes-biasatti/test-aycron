import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WarehousesService } from 'src/app/home/services/warehouses.service';
import { Warehouse } from '../interfaces/warehoust.const';

@Injectable({
  providedIn: 'root'
})
export class WarehousesResolver implements Resolve<Warehouse[]> {

  constructor(private warehousesService: WarehousesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Warehouse[]> {
    return this.warehousesService.getWarehouses();
  }
}
