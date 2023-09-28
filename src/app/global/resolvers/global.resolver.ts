import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { DataCountry } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalResolver implements Resolve <DataCountry> {
  constructor(private globalService: GlobalService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataCountry> {
    return this.globalService.getCountryCode();
  }
}
