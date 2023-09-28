import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationTypeComponent } from './components/donation-type/donation-type.component';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NoanonymousComponent } from './components/noanonymous/noanonymous.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns'; 
import { HttpClientModule } from '@angular/common/http';
import { ThanksDonationComponent } from './components/thanks-donation/thanks-donation.component';
import { FailureComponent } from './components/failure/failure.component';
import { ListeDonationTypeResolver } from './resolvers/liste-donation-type.resolver';
import { DonationService } from './services/donation.service';

const donationRoutes: Routes = [
  // {path: '', component: DonationTypeComponent},
  {path: 'type', component: DonationTypeComponent},
  {path: 'type/non-anonyme', component: NoanonymousComponent,resolve:{donationTypeResolver:ListeDonationTypeResolver}},
  {path: 'type/anonyme', component: AnonymousComponent,resolve:{donationTypeResolver:ListeDonationTypeResolver}},
  {path: 'remerciements', component: ThanksDonationComponent},
  {path: 'echec', component: FailureComponent},
];

@NgModule({
  declarations: [
    DonationTypeComponent,
    AnonymousComponent,
    NoanonymousComponent,
    ThanksDonationComponent,
    FailureComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(donationRoutes)
  ],
  providers:[
    DonationService, //Est en lazy load, sera chargé que si le module don est chargé
    ListeDonationTypeResolver,
  ]
})
export class DonationModule { }
