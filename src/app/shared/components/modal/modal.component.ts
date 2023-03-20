import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, public diagloRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: [null, Validators.required, Validators.pattern(new RegExp('/^[0-9]+$/'))],
      name: [null, Validators.required],
      address: [null, Validators.required],
      state: [null, Validators.required],
      county: [null],
      zip: [null]
    })
  }

  save(): void {

  }

  cancel(): void {
    this.diagloRef.close(this.form.value);
  }

}
