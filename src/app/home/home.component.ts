import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../shared/components/table/table.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../shared/service/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild("tableWarehouse", { static: false }) tableWarehouses!: TableComponent;
  @ViewChild(ModalComponent, { static: false }) modal!: ModalComponent;

  constructor(public dialog: MatDialog, private snackbarService: SnackbarService) { }

  ngOnInit(): void { }

  openModal(): void {
    let dialogRef = null;
    dialogRef = this.dialog.open(ModalComponent, { width: '500px' });
    dialogRef?.afterClosed().subscribe(result => {
      console.log('Closed modal')
      if (!result) return;
      //TODO: save warehouse
    },
      err => {
        this.snackbarService.openSnackBarError(err, 'Ok');
      });
  }
}
