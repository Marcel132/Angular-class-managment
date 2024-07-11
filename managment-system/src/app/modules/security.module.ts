import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/security/login/login.component';
import { LoginService } from '../services/login.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class SecurityModule { }
