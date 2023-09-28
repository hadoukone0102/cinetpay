import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent {
constructor(private coreService: CoreService, private router:Router, ){

}
goToAccueil(){
  this.coreService.goToHome();
}
goToDonationType(){
  this.router.navigate(['/dons/type'])
}
}
