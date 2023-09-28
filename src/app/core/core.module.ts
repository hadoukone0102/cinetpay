import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { ModuleComponent } from './components/module/module.component';
import { FormsModule } from '@angular/forms';
import { CaptchaComponent } from './components/captcha/captcha.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    CaptchaComponent,
    ModuleComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ModuleComponent
  ]
})
export class CoreModule { }
