import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fileProducts } from '../../utils/products.reader';
import { SnackbarService } from '../../service/snackbar.service';
import { Warehouse } from '../../interfaces/warehoust.const';
import { WarehousesService } from 'src/app/home/services/warehouses.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form!: FormGroup;
  productFilename: string = "";
  data: Warehouse[] = [];

  constructor(private formBuilder: FormBuilder, 
    public diagloRef: MatDialogRef<ModalComponent>,
    private snackbarService: SnackbarService,
    private warehousesService: WarehousesService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      list_products: [null, Validators.required],
      code: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: [null, Validators.required],
      address: [null, Validators.required],
      state: [null, Validators.required],
      county: [null],
      zip: [null],
    });

    this.warehousesService.getWarehouses().subscribe(whs => {
      this.data = whs;
    })
  }

  save(): void {
    if (this.existsWarehouse(+this.form.controls['code'].value)) {
      this.snackbarService.openSnackBarError('The warehouse you are traying to save already exists.', 'OK');
      return;
    }
    if (this.form.valid) {
      this.diagloRef.close(this.form.value);
      return;
    }
    this.snackbarService.openSnackBarError('Form has errors', 'Ok');
  }

  existsWarehouse(code: number) {
    return this.data.some(warehouse => +warehouse.code === code);
  }

  cancel(): void {
    this.diagloRef.close(null);
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    this.productFilename = file.name;
    await fileProducts(file).then((products => {
      this.form.controls['list_products'].setValue(products);
    }));
  }

}
