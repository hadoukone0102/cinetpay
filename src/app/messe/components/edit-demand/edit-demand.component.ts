import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-edit-demand',
  templateUrl: './edit-demand.component.html',
  styleUrls: ['./edit-demand.component.css']
})
export class EditDemandComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private coreService: CoreService) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      // ... Add more form controls and validators for other fields ...
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Form is valid, process the submission
      console.log('Form submitted successfully');
      console.log(this.form.value);
      this.goToEditDemandTime();
      // You can perform your submission logic here
    } else {
      // Form is invalid, display error messages
      console.log('Form validation failed');
    }
  }

  goToMesseType(){
    this.coreService.goToMesseType()
  }

  goToEditDemandTime(){
    this.coreService.goToEditDemandTime()
  }
}
