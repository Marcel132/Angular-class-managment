import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  changeForms: boolean = true;
  changePasswordType: string = "password";
  imgSource: string = "../../../../assets/img/eye.svg"
  login_email: string = ''
  login_password: string = ''
  signup_password: string = ''
  signup_email: string = ''

  handlerPasswordType() {
    this.changePasswordType = this.changePasswordType === "password" ? "text" : "password";
    this.imgSource = this.imgSource === "../../../../assets/img/eye.svg" ? "../../../../assets/img/eye-slash.svg" : "../../../../assets/img/eye.svg"
  }

  handlerForms(){
    this.changeForms = this.changeForms ? false : true
  }

  onLoginSubmit(){

  }

  onRegisterSubmit(){

  }
}
