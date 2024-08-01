import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main.component';
import { SharedModule } from '../../../../modules/shared.module';
import { Title } from '@angular/platform-browser';
import { AccountService } from '../../../../services/account.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MainComponent,
    SharedModule
  ],
  providers: [
    AccountService,
    AuthService
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{


  constructor(
    private accountService: AccountService,
    private titleService: Title,
  ){
    this.titleService.setTitle('Konto');
  }
  isDataLoaded = false

  editUsername = '';
  editCountry = '';
  editPhoneNumber = '';

  // User Information section
  email!: string
  username!: string
  country!: string
  phoneNumber!: string



  async ngOnInit() {
    // this.changeTemplate = this.isAdmin === true ? 'isAdmin' : (this.isMod === true ? 'isMod' : 'isUser')
    await this.accountService.getViusalData().then(data => {
      this.email = data.email
      this.username = data.username
      this.country = data.country
      this.phoneNumber = data.phoneNumber
    })

    this.isDataLoaded = true
  }

  private async setUserInfo(){
    this.editUsername = this.editUsername != '' ? this.editUsername : this.username
    this.editCountry = this.editCountry != '' ? this.editCountry : this.country
    this.editPhoneNumber = this.editPhoneNumber != '' ? this.editPhoneNumber : this.phoneNumber


    this.accountService.getUserData(this.editUsername, this.editPhoneNumber, this.editCountry)
  }

  async getUserInfo(){
    await this.setUserInfo()
    setTimeout(()=> {
      window.location.reload();
    }, 1500)
  }

  showEditMode: boolean = false

  toogleEditMode() {
    this.showEditMode = !this.showEditMode;
    this.toggleScroll(this.showEditMode);
  }

  toggleScroll(isOpen: boolean) {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  // Security section
  oldPassword = ''
  newPassword = ''
  invalidOldPassword = false
  invalidNewPassword = false
  noMinLetters = false

  async checkPasswords(){
    const passwords = await this.accountService.getSetNewPassword(this.oldPassword, this.newPassword);
    const checkValidNewPassword = await this.accountService.checkValidPassword(this.newPassword);


    if (passwords && checkValidNewPassword.isValid) {
      this.oldPassword = ''
      this.newPassword = ''
    } else {
      this.invalidOldPassword = !passwords;
      this.invalidNewPassword = checkValidNewPassword.errors.invalidNewPassword;
      this.noMinLetters = checkValidNewPassword.errors.noMinLetters;
    }
  }

  oldPasswordInputType: string = 'password'
  newPasswordInputType: string = 'password'

  imgSrcOldPassword: string = '../../../../../assets/img/eye.svg'
  imgSrcNewPassword: string = '../../../../../assets/img/eye.svg'

  changePasswordType(input: string){
    if(input === "old"){
      this.oldPasswordInputType = this.oldPasswordInputType === "password" ? "text" : "password";
      this.imgSrcOldPassword = this.imgSrcOldPassword === "../../../../../assets/img/eye.svg" ? "../../../../assets/img/eye-slash.svg" : "../../../../../assets/img/eye.svg"
    } else if(input === "new"){
      this.newPasswordInputType = this.newPasswordInputType === "password" ? "text" : "password";
      this.imgSrcNewPassword = this.imgSrcNewPassword === "../../../../../assets/img/eye.svg" ? "../../../../assets/img/eye-slash.svg" : "../../../../../assets/img/eye.svg"
    }
  }

  // Delete account section
  showBox: boolean = false
  deleteAccount(choose: string){
    if(choose === 'check'){
      this.showBox = !this.showBox
    } else if(choose === 'cancel'){
      this.showBox = false
    } else if(choose === 'delete'){
      this.accountService.getDeleteData()
    }
  }
}
