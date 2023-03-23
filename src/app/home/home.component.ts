import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../shared/components/table/table.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../shared/service/snackbar.service';
import { Warehouse } from '../shared/interfaces/warehoust.const';
import { WarehousesService } from './services/warehouses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild("tableWarehouse", { static: false }) tableWarehouses!: TableComponent;
  @ViewChild(ModalComponent, { static: false }) modal!: ModalComponent;
  data: Warehouse[] = [];

  constructor(public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private warehousesService: WarehousesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.data.subscribe((data) => {
      this.data = data['warehouses'];
    });
  }

  openModal(): void {
    let dialogRef = null;
    dialogRef = this.dialog.open(ModalComponent, { width: '500px', data: this.data });
    dialogRef?.afterClosed().subscribe((result: Warehouse) => {
      if (!result) return;
      this.saveWarehouse(result)
    },
      err => {
        this.snackbarService.openSnackBarError(err, 'Ok');
      });
  }

  saveWarehouse(warehouse: Warehouse) {
    this.warehousesService.saveWarehouse(warehouse).then(() => {
      this.snackbarService.openSnackBarSuccess('Warehouse saved successfully', 'OK');
    }).catch(err => {
      this.snackbarService.openSnackBarError(`Error: ${err}`, 'OK');
    });
  }

  redirectNWC() {
    this.router.navigate(['nearest-warehouse']);
  }

}
