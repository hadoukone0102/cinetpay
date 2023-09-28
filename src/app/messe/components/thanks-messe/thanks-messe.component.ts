import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-thanks-messe',
  templateUrl: './thanks-messe.component.html',
  styleUrls: ['./thanks-messe.component.css']
})
export class ThanksMesseComponent {
  constructor(private coreService: CoreService){

  }
  goToAccueil(){
    this.coreService.goToHome();
  }
}
