import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { fileProducts } from '../../utils/products.reader';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form!: FormGroup;
  productFilename: string = "";

  constructor(private formBuilder: FormBuilder, 
    public diagloRef: MatDialogRef<ModalComponent>,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      list_products: [null, Validators.required],
      code: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: [null, Validators.required],
      address: [null, Validators.required],
      state: [null, Validators.required],
      county: [null],
      zip: [null],
    })
  }

  save(): void {
    if (this.form.valid) {
      this.diagloRef.close(this.form.value);
      return;
    }
    console.log(this.form.value);
    this.snackbarService.openSnackBarError('Form has errors', 'Ok');
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
