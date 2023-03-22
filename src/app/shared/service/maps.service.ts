import { Injectable } from '@angular/core';
import { MarkerResult, WarehouseDirectionsResult, WarehousesDirectionsRequest } from '../constants/warehouse-directions-result.const';
import { Warehouse } from '../interfaces/warehoust.const';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  directionsService = new google.maps.DirectionsService();
  geocoder = new google.maps.Geocoder();

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

  async getMarkers(warehouse: Warehouse[], map: google.maps.Map) {
    const markers: google.maps.Marker[] = []
    const promises = warehouse.map(ws => {
      let location: google.maps.LatLngLiteral;
      return new Promise<MarkerResult>((resolve, reject) => {
        this.geocoder.geocode({ address: ws.address }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            location = results[0].geometry.location.toJSON() as google.maps.LatLngLiteral;
            console.log({location});
            resolve({ location: location, ws_name: ws.name });
          }
          else {
            reject(`Geocode failed: ${status}`);
          }
        })
      })
    })

    const results = await Promise.all(promises);
    results.forEach((value: MarkerResult) => {
      const marker = new google.maps.Marker({ position: value.location, map: map, title: value.ws_name });
      console.log({marker})
      markers.push(marker);
    });

    return markers;
  }

}
