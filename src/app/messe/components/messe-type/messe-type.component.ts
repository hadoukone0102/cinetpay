import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-messe-type',
  templateUrl: './messe-type.component.html',
  styleUrls: ['./messe-type.component.css']
})
export class MesseTypeComponent {
  isLoading!: boolean;
  isSubmiting!: boolean;
  constructor(private coreService: CoreService){}

  goToMesseQuotidienne(){
    this.coreService.goToMesseQuotidienne();
  }

  goToMesseNeuvaine(){
    this.coreService.goToMesseNeuvaine();
  }
  
  goToMesseTrentaine(){
    this.coreService.goToMesseTrentaine();
  }

  goToEditDemand(){
    this.coreService.goToEditDemand();
  }
}
