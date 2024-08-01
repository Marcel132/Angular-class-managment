import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  async getUser(){
    const user = await this.afAuth.currentUser
    if(user){
      const uid = user.uid
      return uid
    } else {
      console.log("User not found", "Please login to your account")
      return false
    }
  }
}
