import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-donation-type',
  templateUrl: './donation-type.component.html',
  styleUrls: ['./donation-type.component.css']
})
export class DonationTypeComponent {
  isLoading!: boolean;
  isSubmitting:boolean=false;
  constructor(private coreService: CoreService){

  }
  ngOnInit() {
    this.isLoading=true;
  }
  couleurFond = 'orange';
  goToAnonymous(){
    this.coreService.goToAnonymous();
    this.isSubmitting=true;
  }
  goToNoAnonymous(){
    this.coreService.goToNoAnonymous();
    this.isSubmitting=true;
  }
}
