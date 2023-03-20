import { Component, Input, OnInit } from '@angular/core';
import { Warehouse } from '../../constants/warehoust.const';
import { WarehousesService } from 'src/app/home/services/warehouses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data: Warehouse[] = [];

  constructor(private warehousesService: WarehousesService) { }

  ngOnInit(): void {
    this.warehousesService.getWarehouses().subscribe(whs => {
      this.data = whs;
    })
  }

  displayedColumns: string[] = ['code', 'name', 'address', 'state', 'county', 'zip', 'actions'];

}
