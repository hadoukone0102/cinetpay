import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './global/components/home/home.component';
import { MesseTypeComponent } from './messe/components/messe-type/messe-type.component';

const routes: Routes = [
  {path: 'dons', loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule), }, 
  {path: 'messe', loadChildren: () =>import('../app/messe/messe.module').then(m => m.MesseModule)},
  {path: 'accueil', component: HomeComponent},
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: '**', redirectTo: '/page-introuvable'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
