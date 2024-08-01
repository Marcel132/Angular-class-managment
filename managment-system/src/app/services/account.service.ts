import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { AbstractControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
  ) { }

  private async createUserData( username: string, phoneNumber: string, country: string){
    const uid =  await this.authService.getUser()
    if(uid){
      console.log("CreateUserData ",uid)
      const userData = this.firestore.collection('users').doc(uid)
      const userEmail = await firstValueFrom(userData.get())
      if(userData){
        const userSchema = {
          email: userEmail.get('email'),
          username: username,
          phoneNumber: phoneNumber,
          country: country,
        }

        try {
          await this.firestore.collection('user_data').doc(uid).set(userSchema)
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log("user not found in database")
      }
    } else {
      console.log("user not found in session")
    }
  }

  async getUserData(username: string, phoneNumber: string, country: string){
    return this.createUserData(username, phoneNumber, country)
  }

  email: string = ''
  username: string = ''
  phoneNumber: string = ''
  country: string = ''

  private async VisualDataForUser(){
    const uid =  await this.authService.getUser()
    if(uid){
      console.log("Visual Data",uid)
      const firebaseData = this.firestore.collection('user_data').doc(uid)
      if(firebaseData){
        const userData = await firstValueFrom(firebaseData.get())
        if(userData.exists){
          const email = userData.get('email')
          const username = userData.get('username')
          const phoneNumber = userData.get('phoneNumber')
          const country = userData.get('country')

          this.email = email
          this.username = username
          this.phoneNumber = phoneNumber
          this.country = country
          return true
        }
        else {
          console.log("User data does not exist")
          return false
        }
      }
      else {
        console.log('Firebase data not found')
        return false
      }
    }
    else {
      this.router.navigate(['/home']);
      return false
    }
  }

  async getViusalData(): Promise<{email: string, username: string, phoneNumber: string, country: string}>{
    await this.VisualDataForUser()
    return {email: this.email, username: this.username, phoneNumber: this.phoneNumber, country: this.country}
  }

  // Security section

  async checkValidPassword(password: string){
    const invalidCharacters = ['/', ',', '\\', ')', '(', '{', '}', '[', ']', '!', '#', '$', '%', '^', '&', '*', '"', "'", '<', '>', ':', ';', '+', '=', '@', '?'];
    let errors = { invalidNewPassword: false, noMinLetters: false };

    if (password) {
      if (invalidCharacters.some(char => password.includes(char))) {
        errors.invalidNewPassword = true;
      }

      if (password.length < 8) {
        errors.noMinLetters = true;
      }

      if((!invalidCharacters.some(char => password.includes(char))) && (password.length >= 8)){
        errors.invalidNewPassword = false
        errors.noMinLetters = false
      }
    }

    const isValid = !errors.invalidNewPassword && !errors.noMinLetters;
    return { isValid, errors };
  }

  private async getPasswordFromDatabase(){
    const uid =  await this.authService.getUser()
    if(uid){
      const data = this.firestore.collection('users').doc(uid)
      if(data){
        const firebaseData = await firstValueFrom(data.get())
        if((firebaseData).exists){
          const password = firebaseData.get('password')
          return password
        } else{
          console.log('Password not found')
        }
      } else{
        console.log('Data not found')
      }
    } else {
      console.log('User not found')
    }
  }

  private async checkPasswords(oldPassword: string){
    const databaseHashedPassword = await this.getPasswordFromDatabase()

    const encoder = new TextEncoder();
    const data = encoder.encode(oldPassword);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    if(databaseHashedPassword == hashedPassword){
      return true
    } else {
      return false
    }
  }

  private async setNewPassword(oldPassword: string, newPassword: string){
    const validPasswords = await this.checkPasswords(oldPassword)
    if(validPasswords){
      const user = await this.afAuth.currentUser
      if(user){
        const encoder = new TextEncoder();
        const data = encoder.encode(newPassword);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

        try {
          await user.updatePassword(hashedPassword)
          await this.firestore.collection('users').doc(user.uid).update({
            password: hashedPassword
          })
          console.log("Updated password")
          return true

        } catch (err) {
          console.log("You must relogin your account \n", err)
          return false
        }

      } else {
        return false
      }
    } else {
      return false
    }

  }

  getSetNewPassword(oldPassword: string, newPassword: string){
    return this.setNewPassword(oldPassword, newPassword)
  }
  // For deleting account
  private async deleteAccount(uid: string){
    try{
      const user = await this.afAuth.currentUser
      if(user){
        console.log("Delete Account",user)
        await user.delete()
        await this.firestore.collection('users').doc(uid).delete()
        await this.firestore.collection('user_data').doc(uid).delete()
        await this.firestore.collection('status').doc(uid).delete()
        sessionStorage.removeItem('isLoggedIn')
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } else {
        console.log("User not found")
      }
    } catch (err){
      console.log(err)
    }
  }

  async getDeleteData(){
    const uid = await this.authService.getUser()
    if(uid){
      this.deleteAccount(uid)
    }
  }
}

