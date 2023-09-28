import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MesseTypeComponent } from './components/messe-type/messe-type.component';
import { SharedModule } from '../shared/shared.module';
import { MesseQuotidienneComponent } from './components/messe-quotidienne/messe-quotidienne.component';
import { MesseNeuvaineComponent } from './components/messe-neuvaine/messe-neuvaine.component';
import { MesseTrentaineComponent } from './components/messe-trentaine/messe-trentaine.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditDemandComponent } from './components/edit-demand/edit-demand.component';
import { EditDemandTimeComponent } from './components/edit-demand-time/edit-demand-time.component';
import { MesseService } from './services/messe.service';
import { ThanksMesseComponent } from './components/thanks-messe/thanks-messe.component';
import { FailureComponent } from './components/failure/failure.component';

const messeRoutes : Routes = [
  {path: 'type', component: MesseTypeComponent },
  {path: 'type/quotidienne', component: MesseQuotidienneComponent},
  {path: 'type/neuvaine', component: MesseNeuvaineComponent},
  {path: 'type/trentaine', component: MesseTrentaineComponent},
  {path: 'type/edit-demand', component: EditDemandComponent},
  {path: 'type/edit-demand-time', component: EditDemandTimeComponent},
  {path: 'remerciements', component: ThanksMesseComponent},
  {path: 'echec', component: FailureComponent},
];

@NgModule({
  declarations: [
    MesseTypeComponent,
    MesseQuotidienneComponent,
    MesseNeuvaineComponent,
    MesseTrentaineComponent,
    EditDemandComponent,
    EditDemandTimeComponent,
    ThanksMesseComponent,
    FailureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(messeRoutes)
  ],
  providers:[
    MesseService
  ]
})
export class MesseModule { }
