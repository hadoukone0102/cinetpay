import { Component } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(
    private router:Router, 
    private coreService: CoreService,
    ){}
   
  

  goToDonationType(){
    this.coreService.goToDonationType();
  }

}
