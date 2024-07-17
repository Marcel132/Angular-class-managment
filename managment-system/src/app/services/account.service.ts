import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private sessionService: SessionService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  private async createUserData( username: string, phoneNumber: string, country: string){
    const user = this.sessionService.get('manageSystemSession')
    if(user){
      const userData = this.firestore.collection('user_data').doc(user.email)
      if(userData){
        const userSchema = {
          email: user.email,
          username: username,
          phoneNumber: phoneNumber,
          country: country,
        }

        try {
          await this.firestore.collection('user_data').doc(user.email).set(userSchema)
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

  public async getUserData(username: string, phoneNumber: string, country: string){
    return this.createUserData(username, phoneNumber, country)
  }

  email: string = ''
  username: string = ''
  phoneNumber: string = ''
  country: string = ''

  private async VisualDataForUser(){
    const user = await this.sessionService.get('manageSystemSession')
    if(user){
      const userData = this.firestore.collection('user_data').doc(user.email)
      if(userData){
        const data = await firstValueFrom(userData.get())
        if(data.exists){
          const username = data.get('username')
          const phoneNumber = data.get('phoneNumber')
          const country = data.get('country')

          this.email = user.email
          this.username = username
          this.phoneNumber = phoneNumber
          this.country = country

          return true
        } else {
          console.log('Data not found')
          return false
        }
      } else {
        console.log('Data in database not found')
        return false
      }
    } else {
      console.log('Data in session storage not found')
      return false
    }
  }

  async getViusalData(): Promise<{email: string, username: string, phoneNumber: string, country: string}>{
    await this.VisualDataForUser()
    return {email: this.email, username: this.username, phoneNumber: this.phoneNumber, country: this.country}
  }

  // Security section

  checkValidPassword(control: AbstractControl){
    const invalidWords = ['/',',','\\',')','(','{','}','[',']','!','#','$','%','^','&','*','"',"'",'<','>',':',';','+','=', '@', '?']
    if(control.value && invalidWords.some(word => control.value.includes(word))){
      return {invalidPassword: true}
    }
    if(control.value && control.value.length < 8){
      return {invalidPassword: true}
    }
    return null
  }

  private async oldPassword(){
    const user = await this.sessionService.get('manageSystemSession')
    if(user){
      const data = this.firestore.collection('users').doc(user.uid)
      if(data){
        const firebaseData = await firstValueFrom(data.get())
        if((firebaseData).exists){
          const oldHashedPassword = firebaseData.get('password')
          return oldHashedPassword
        } else{
          console.log('Hashed password not found')
        }
      } else{
        console.log('User not found')
      }
    } else {
      console.log('Session not found')
    }
  }

  private async checkPasswords(password: string){
    const oldPassword = await this.oldPassword()

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    if(oldPassword === hashedPassword){
      return true
    } else {
      return false
    }
  }
  getNewPassword(password: string){
    return this.checkPasswords(password)
  }

  private async setNewPassword(password: string){
    const validatePassword = this.checkPasswords(password)
    const userStorage = await this.sessionService.get('manageSystemSession')

    if (!validatePassword) {
      throw new Error('Invalid password');
    }
    if(!userStorage){
      console.log("Cannot find a storage")
    }

    try {
      const user = await this.afAuth.currentUser
      if(user){
        //Hash the password
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

        await user.updatePassword(password)
        await this.firestore.collection('users').doc(userStorage.uid).update({
          password: hashedPassword
        })

        console.log("Updated password")

        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (err){
      console.log(err)
    }

  }
  getSetNewPassword(password: string){
    return this.setNewPassword(password)
  }
  // For deleting account
  private async deleteAccount(uid: string, email: string, sessionStorage: string, userStorage: string){
    try{
      const user = await this.afAuth.currentUser
      if(user){
        await user.delete()
        await this.firestore.collection('users').doc(uid).delete()
        console.log("Deleted users")
        await this.firestore.collection('user_data').doc(email).delete()
        console.log("Deleted user_data")
        this.sessionService.clear(sessionStorage)
        this.sessionService.clear(userStorage)
        console.log("Deleted account")
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

  getDeleteData(){
    const userStorage = this.sessionService.get('manageSystemSession')
    if(userStorage){
      const email = userStorage.email
      const uid = userStorage.uid
      this.deleteAccount(uid, email, 'isLoggedIn', 'manageSystemSession')
    }
  }
}

