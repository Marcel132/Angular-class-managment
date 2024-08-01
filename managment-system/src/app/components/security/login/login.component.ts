import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { SharedModule } from '../../../modules/shared.module';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],
  providers: [
    LoginService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private loginService: LoginService
  ){}

  changeForms: boolean = false;
  changePasswordType: string = "password";
  imgSource: string = "../../../../assets/img/eye.svg"
  isLoading: boolean = false;


  invalidEmail: boolean = false;
  invalidPassword: boolean = false;

  invalidLogin: boolean = false;
  invalidSignup: boolean = false;

  handlerPasswordType() {
    this.changePasswordType = this.changePasswordType === "password" ? "text" : "password";
    this.imgSource = this.imgSource === "../../../../assets/img/eye.svg" ? "../../../../assets/img/eye-slash.svg" : "../../../../assets/img/eye.svg"
  }

  handlerForms(){
    this.changeForms = !this.changeForms ? true : false
  }

  get loginForm(): FormGroup { return this.loginService.getLoginForm() }
  get signupForm(): FormGroup { return this.loginService.getSignupForm() }
  get submitted() { return this.loginService.submitted }

  get loginEmail() { return this.loginService.getLoginForm().get('login_email')}
  get loginPassword() { return this.loginService.getLoginForm().get('login_password')}

  get signupEmail() { return this.loginService.getSignupForm().get('signup_email')}
  get signupPassword() { return this.loginService.getSignupForm().get('signup_password')}

  async onLoginSubmit(){
    if(this.loginEmail?.valid && this.loginPassword?.valid){
      const success = await this.loginService.getLoginUser(this.loginEmail.value, this.loginPassword.value)
      if(success){
        this.isLoading = true
        window.document.body.style.cursor = 'wait'
        await this.loginService.checkStatus()
        setTimeout(()=>{
          window.location.reload()
          this.isLoading = false
        }, 1500)
      } else{
        this.invalidLogin = true
      }
    }
  }

  async onSignupForm(){
    if(this.signupEmail?.valid && this.signupPassword?.valid){
      const success = await this.loginService.getSignupUser(this.signupEmail.value, this.signupPassword.value)

      if(success){
        this.isLoading = true
        await this.loginService.checkStatus()
        setTimeout(()=>{
          window.location.reload()
          this.isLoading = false
        }, 1500)
      } else {
        this.invalidSignup = true
      }
    }
  }

}
