import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-messe-neuvaine',
  templateUrl: './messe-neuvaine.component.html',
  styleUrls: ['./messe-neuvaine.component.css']
})
export class MesseNeuvaineComponent {
  form: FormGroup;
  currentStep = 1;

  defaultIntention: string = 'Pour le repos de l\'âme de ...';

  collectedData: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkAnonymous: [false, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      intention: ['', Validators.required],
      intentionText: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      // ... Add more form controls and validators for other fields ...
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Form is valid, process the submission
      console.log('Form submitted successfully');
      console.log(this.form.value);
      console.log(this.form.value.intention);

      // You can perform your submission logic here
    } else {
      // Form is invalid, display error messages
      console.log('Form validation failed');
      // You can display error messages to the user
    }
  }

  onNextClick() {
    const currentStepControls = this.getStepControls(this.currentStep);
    if (currentStepControls.every(control => control.valid)) {
      if (this.currentStep === 1) {
        this.collectedData.stepOne = this.form.value; // Store step one data
      } else if (this.currentStep === 2) {
        this.collectedData.stepTwo = this.form.value; // Store step two data
      } else if (this.currentStep === 3) {
        this.collectedData.stepThree = this.form.value; // Store step three data
      }
      this.currentStep++;
    } else {
      // Mark form controls as touched to trigger error messages
      this.markFormControlsAsTouched(currentStepControls);
    }
  }

  onPreviousClick() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private markFormControlsAsTouched(controls: Array<any>) {
    controls.forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(Object.values(control.controls));
      } else {
        control.markAsTouched();
      }
    });
  }

  private getStepControls(step: number): Array<any> {
    switch (step) {
      case 1:
        return [
          this.form.get('checkAnonymous'),
          this.form.get('firstName'),
          this.form.get('lastName'),
          this.form.get('phone')
        ];
      case 2:
        return [this.form.get('intention'), this.form.get('intentionText')];
      case 3:
        return [this.form.get('date')];
      default:
        return [];
    }
  }
}
