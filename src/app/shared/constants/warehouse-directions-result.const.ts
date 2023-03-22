import { Warehouse } from "../interfaces/warehoust.const";

export interface WarehousesDirectionsRequest { 
    request: google.maps.DirectionsRequest,
    warehouse: Warehouse
}

export interface WarehouseDirectionsResult {
    warehouse: Warehouse,
    directionResult: google.maps.DirectionsResult,
    distance: number
}
