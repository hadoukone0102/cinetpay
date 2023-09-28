import { Component } from '@angular/core';
import { CoreService } from '../../services/core.service';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {
  constructor(private coreService:CoreService){}
  couleurFond = 'orange';

}
