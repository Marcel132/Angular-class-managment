import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/security/login/login.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class SecurityModule { }
