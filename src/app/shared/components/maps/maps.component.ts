import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { } from 'googlemaps';
import { MapsService } from '../../service/maps.service';
import { Warehouse } from '../../interfaces/warehoust.const';
import { WarehouseDirectionsResult, WarehousesDirectionsRequest } from '../../constants/warehouse-directions-result.const';
import { SpinnerService } from '../../service/spinner.service';
import { SnackbarService } from '../../service/snackbar.service';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  map!: google.maps.Map;
  warehouses: Warehouse[] = [];
  nearestWarehouses: WarehouseDirectionsResult[] = [];
  directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(private route: ActivatedRoute,
    private mapsService: MapsService,
    private spinnerService: SpinnerService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(-31.4201, -64.1888),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map')!, mapProperties);

    this.route.data.subscribe((data) => {
      this.warehouses = data['warehouses'];
    });

    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map
    });
  }

  public async search(searchDirection = 'Bartolomé de las Casas 3770, Córdoba Capital') {
    const requests: WarehousesDirectionsRequest[] = this.warehouses.map(ws => {
      const request: google.maps.DirectionsRequest = {
        origin: searchDirection,
        destination: `${ws.address}, ${ws.state}`,
        travelMode: google.maps.TravelMode.DRIVING
      };
      return { request, warehouse: ws };
    });

    this.spinnerService.show();

    this.mapsService.calculateAllDirections(requests).then(directions => {
      const sortedDirections = this.mapsService.getNearestWarehouses(directions);
      this.nearestWarehouses = sortedDirections;
    })
      .catch(error => {
        this.snackbarService.openSnackBarError(`Error calculating directions: ${error}`, 'OK');
      }).finally(() => {
        this.spinnerService.hide();
      })
  }

  async renderDirections(directionResult: google.maps.DirectionsResult) {
    this.directionsRenderer.setDirections(directionResult);
  }

}
