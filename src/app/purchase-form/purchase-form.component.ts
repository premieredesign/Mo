import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public form: FormGroup;

  ngOnInit() {
    this.setupPurchaseForm();
    console.log(this.form.value);
  }

  public setupPurchaseForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
    });

    this.form = this.formBuilder.group({
      firstName: '',
      lastName: ''
    });
  }

  public submit(): void {
    console.log('submitted', this.form.value);
  }
}
