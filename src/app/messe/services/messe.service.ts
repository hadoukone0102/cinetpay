import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { CoreService } from 'src/app/core/services/core.service';
import { MasseRequest, DataResult } from '../models/masse.model';

@Injectable({
  providedIn: 'root'
})
export class MesseService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) {}

  //Add masse request 
  addMasseRequest(MasseRequest: MasseRequest): Observable<DataResult> {
    console.log(`${environment.apiUrlMesse}/requestmesse/create`);
    console.log(MasseRequest);
    const httpOptions={
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };
    return this.http.post<DataResult>(`${environment.apiUrlMesse}/requestmesse/create`, MasseRequest).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
}
