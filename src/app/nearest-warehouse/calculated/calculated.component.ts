import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsComponent } from 'src/app/shared/components/maps/maps.component';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-calculated',
  templateUrl: './calculated.component.html',
  styleUrls: ['./calculated.component.css']
})
export class CalculatedComponent implements OnInit {

  form!: FormGroup;
  @ViewChild(MapsComponent) maps!: MapsComponent;

  constructor(private formBuilder: FormBuilder, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, Validators.required],
    });
  }

  ejecutar() {
    if (!this.form.valid) {
      this.snackbarService.openSnackBarError('Address is empty', 'OK');
      return;
    }
    this.maps.search(this.form.value.address);
  }

}
