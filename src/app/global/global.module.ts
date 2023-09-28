import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { RouterModule, Routes } from '@angular/router';

const globalRoutes: Routes = [
  {path: 'erreur', component: PageErrorComponent}, 
  {path: 'page-introuvable', component: PageNotFoundComponent}, 
];

@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(globalRoutes) 
  ]
})
export class GlobalModule { }
