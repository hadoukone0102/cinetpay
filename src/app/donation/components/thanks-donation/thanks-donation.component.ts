import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-thanks-donation',
  templateUrl: './thanks-donation.component.html',
  styleUrls: ['./thanks-donation.component.css']
})
export class ThanksDonationComponent {
  constructor(private coreService: CoreService){

  }
  goToAccueil(){
    this.coreService.goToHome();
  }
}
