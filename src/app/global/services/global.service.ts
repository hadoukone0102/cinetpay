import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataCinetPay, DataResultCinetPay } from 'src/app/donation/models/cinetpay.model';
import { DataResultTransactionId, DataTransactionId } from '../models/transaction.model';

/**
 * Content global function witch communicate with APIs
 * @date 7/14/2023 - 1:20:53 PM
 *
 * @export
 * @class GlobalService
 * @typedef {GlobalService}
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(private http: HttpClient,private coreService: CoreService) { }

sendDataToCinetPay(Admin: DataCinetPay): Observable<DataResultCinetPay>{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };
  return this.http.post<DataResultCinetPay>(`${environment.apiUrlCinetPay}`, Admin, httpOptions).pipe(
    catchError((error) => {
      return throwError('Une erreur est survenue lors de la communication avec l\'API CinetPay '+ error);
    }),
    
  );
}


  sendTransactionId(transaction_id: DataTransactionId): Observable<DataResultTransactionId>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataResultTransactionId>(`${environment.apiUrlCinetPay}`, transaction_id, httpOptions).pipe(
      tap((response) => console.log('Données envoyées avec succèes')
      ),
      catchError((error) => {
        console.log('erreur');
        return throwError('Une erreur est survenue lors de la récupération des données: '+ error);
      }),
      
    );
  }
}
