import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { DataCinetPay, DataResultCinetPay } from '../models/cinetpay.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { DataDonation, DataResultDonation } from '../models/donation.model';
import { DonationTypeModel } from '../models/donation-type.model';
import { CoreService } from 'src/app/core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService) { }

  /**
   * Get donation type list
   * @date 7/14/2023 - 1:14:35 PM
   *
   * @returns {Observable<DonationTypeModel>}
   */
  
  getListDonationType(): Observable<DonationTypeModel>{
    return this.http.get<DonationTypeModel>(`${environment.apiUrlDon}/dons/types`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Add donation in the database
   * @date 7/14/2023 - 1:14:55 PM
   *
   * @param {DataDonation} Donation
   * @returns {Observable<DataResultDonation>}
   */
  addDonation(Donation: DataDonation): Observable<DataResultDonation>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataResultDonation>(`${environment.apiUrlDon}/dons/create`, Donation).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
}

