import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Warehouse } from 'src/app/shared/interfaces/warehoust.const';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  WAREHOUSES = "warehouses";
  WAREHOUSES_PRODUCTS = "warehouses-products"

  constructor(public firebaseService: FirebaseService) { }

  getWarehouses(): Observable<Warehouse[]> {
    return this.firebaseService.getCollection(this.WAREHOUSES);
  }

  getWarehouseByCode(code: number): Observable<Warehouse[]> {
    return this.firebaseService.getDocumentByProp(this.WAREHOUSES, 'code', code);
  }

  saveWarehouse(warehouse: Warehouse): Promise<DocumentReference<Warehouse>> {
    return this.firebaseService.addDocument(this.WAREHOUSES, warehouse);
  }

  deleteWarehouse(code: number): void {
    this.firebaseService.deleteDocument(this.WAREHOUSES, 'code', code);
  }
}
