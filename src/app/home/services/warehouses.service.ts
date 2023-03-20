import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from 'src/app/shared/constants/warehoust.const';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  collection = "warehouses";

  constructor(public firebaseService: FirebaseService) { }

  getWarehouses(): Observable<Warehouse[]> {
    return this.firebaseService.getCollection<Warehouse>(this.collection);
  }
}
