import { Injectable } from '@angular/core';
import { WarehouseDirectionsResult, WarehousesDirectionsRequest } from '../constants/warehouse-directions-result.const';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  directionsService = new google.maps.DirectionsService();

  constructor() { }

  async calculateAllDirections(wdrs: WarehousesDirectionsRequest[]): Promise<WarehouseDirectionsResult[]> {

    const directions: WarehouseDirectionsResult[] = [];
    const promises = wdrs.map(wdr => this.calculateDirections(wdr));
    const results = await Promise.all(promises);
    results.forEach(({ warehouse, directionResult, distance }) => {
      directions.push({ warehouse: warehouse, directionResult: directionResult, distance });
    });

    return directions;
  }

  async calculateDirections(wdr: WarehousesDirectionsRequest) {
    const result: google.maps.DirectionsResult = await new Promise((resolve, reject) => {
      this.directionsService.route(wdr.request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(result);
        } else {
          reject(status);
        }
      });
    });

    const distance = result.routes[0].legs[0].distance.value;

    return { warehouse: wdr.warehouse, directionResult: result, distance: distance } as WarehouseDirectionsResult;
  };

  getNearestWarehouses(directions: WarehouseDirectionsResult[]): WarehouseDirectionsResult[] {
    const sortedDirections = directions.sort((a, b) => {
      return a.distance - b.distance;
    })
    const nearestDirections = sortedDirections.slice(0, 3);
    return nearestDirections;
  }

}
