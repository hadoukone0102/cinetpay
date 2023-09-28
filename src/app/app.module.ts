import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GlobalModule } from './global/global.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorProvider } from './core/interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    // DonationModule,
    CoreModule,
    GlobalModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [TokenInterceptorProvider], //All time enabled
  bootstrap: [AppComponent]
})
export class AppModule { }
