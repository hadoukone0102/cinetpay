import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { environment } from 'src/environments/environments';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent {
  constructor(
    private router:Router, 
    private coreService: CoreService,
    ){}
   
    couleurFond = 'orange';

  goToDonationType(){
    this.coreService.goToDonationType();
  }

  goToHome(){
    this.coreService.goToHome();
  }

  
  isHome():boolean{
    if (this.router.url.includes('accueil')) {
      return true;
    }
    return false;
  }

  goToMesseType(){
    this.coreService.goToMesseType();
  }

}
