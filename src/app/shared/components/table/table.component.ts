import { Component, Input, OnInit } from '@angular/core';
import { Warehouse } from '../../interfaces/warehoust.const';
import { WarehousesService } from 'src/app/home/services/warehouses.service';
import { saveAs } from 'file-saver';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data: Warehouse[] = [];

  constructor(private warehousesService: WarehousesService, 
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.warehousesService.getWarehouses().subscribe(whs => {
      this.data = whs;
    })
  }

  displayedColumns: string[] = ['code', 'name', 'address', 'state', 'county', 'zip', 'actions'];

  download(warehouse: Warehouse) {
    this.warehousesService.getWarehouseByCode(+warehouse.code).subscribe((prods: Warehouse[])=> {
      const products = prods[0].list_products;
      if (!products) {
        this.snackbarService.openSnackBarError("Warehouse hasn't list products", 'Ok');
        return;
      } 
      const fileContent = products.join('\r\n');
      const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
      const fileName = `${warehouse.name.replace(' ', '_')}Products`;
      saveAs(blob, fileName);
    })
  }

}
