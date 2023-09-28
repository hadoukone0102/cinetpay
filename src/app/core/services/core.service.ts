import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

/**
 * Contains all routes and global functions that 
 * do not communicate with API
 * @date 7/14/2023 - 1:24:48 PM
 *
 * @export
 * @class CoreService
 * @typedef {CoreService}
 */
@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private router: Router){}
  
  handleError(error: any) {
    if(error.status === 401){
      sessionStorage.clear();//Empty the session storage
      // this.goToLogin();//redirect to login if session expired
      return throwError('Erreur d\'authentification: '+ error);
    }
    else if(error.status === 404){
      this.goToPageNotFound();
      return throwError('Page introvalble: '+ error);
    }
     this.goToPageError();//else redirect to page error
     console.log(error);
     
    return throwError( error);
  }

  goToHome(){this.router.navigate(['/accueil']);}

  // ====================================================== //
  // ================= //ANCHOR - DONATION ================ //
  // ====================================================== // 

  goToThanksDonation(){this.router.navigate(['/dons/remerciements'])}
  goToDonationType(){this.router.navigate(['/dons/type']);}
  goToAnonymous(){this.router.navigate(['/dons/type/anonyme']);}
  goToNoAnonymous(){this.router.navigate(['/dons/type/non-anonyme']);}
  goToPageNotFound(){this.router.navigate(['/page-introuvable']);}
  goToPageError(){this.router.navigate(['/erreur']);}



  // ====================================================== //
  // ================= //ANCHOR - MESSE =================== //
  // ====================================================== // 
  goToMesseType(){this.router.navigate(['/messe/type'])}
  goToMesseQuotidienne(){this.router.navigate(['/messe/type/quotidienne'])}
  goToMesseNeuvaine(){this.router.navigate(['/messe/type/neuvaine'])}
  goToMesseTrentaine(){this.router.navigate(['/messe/type/trentaine'])}
  goToEditDemand(){this.router.navigate(['/messe/type/edit-demand'])}
  goToEditDemandTime(){this.router.navigate(['messe/type/edit-demand-time'])}
  goToThanksMesse(){this.router.navigate(['/messe/remerciements'])}
  goToPageMesseError(){this.router.navigate(['/messe/echec'])}
  
}
