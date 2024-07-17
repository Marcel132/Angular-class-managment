import { Component, HostListener, OnInit } from '@angular/core';
import { MainComponent } from '../main.component';
import { SharedModuleModule } from '../../../../modules/shared-module.module';
import { Title } from '@angular/platform-browser';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MainComponent,
    SharedModuleModule
  ],
  providers: [
    AccountService,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{

  // changeTemplate: string = 'isUser'

  // isUser: boolean = this.mainComponent.isUser
  // isMod: boolean = this.mainComponent.isMod
  // isAdmin: boolean = this.mainComponent.isAdmin;


  editUsername: string = '';
  editCountry: string = '';
  editPhoneNumber: string = '';

  constructor(
    private mainComponent: MainComponent,
    private accountService: AccountService,
    private titleService: Title,
  ){
    this.titleService.setTitle('Konto');
  }
  email: string = ''
  username: string = ''
  country: string = ''
  phoneNumber: string = ''

  // User Information section
  async ngOnInit() {
    // this.changeTemplate = this.isAdmin === true ? 'isAdmin' : (this.isMod === true ? 'isMod' : 'isUser')
    await this.accountService.getViusalData().then(data => {
      this.email = data.email
      this.username = data.username
      this.country = data.country
      this.phoneNumber = data.phoneNumber
      console.log(this.email, this.username, this.country, this.phoneNumber)
    })
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

  toogleEditMode(){
    this.showEditMode = !this.showEditMode

  }

  // Security section
  oldPassword: string = ''
  invalidOldPasswords: boolean = false
  newPassword: string = ''

  async checkPasswords(){
    const oldPassword = await this.accountService.getNewPassword(this.oldPassword)

    if(oldPassword && (this.newPassword.length > 8)){
      this.accountService.getSetNewPassword(this.newPassword)
    } else {
      this.invalidOldPasswords = true
    }
  }

  passwordTypeOldPassword: string = 'password'
  passwordTypeNewPassword: string = 'password'

  imgSrcOldPassword: string = '../../../../../assets/img/eye.svg'
  imgSrcNewPassword: string = '../../../../../assets/img/eye.svg'

  changePasswordType(input: string){
    if(input === "old"){
      this.passwordTypeOldPassword = this.passwordTypeOldPassword === "password" ? "text" : "password";
      this.imgSrcOldPassword = this.imgSrcOldPassword === "../../../../../assets/img/eye.svg" ? "../../../../assets/img/eye-slash.svg" : "../../../../../assets/img/eye.svg"
    } else if(input === "new"){
      this.passwordTypeNewPassword = this.passwordTypeNewPassword === "password" ? "text" : "password";
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
