import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionService } from './session.service';
import { firstValueFrom } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private user: boolean = false;
  private mod: boolean = false;
  private admin: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private sessionService: SessionService,
    private afAuth: AngularFireAuth,
    private loginService: LoginService
) { }

  private getUid() {

  }

  private async checkStatus(): Promise<boolean>{
    try {
      const uid = this.sessionService.get('uid')
      if(uid){
        const firebaseData = this.firestore.collection('status').doc(uid)
        const data = await firstValueFrom(firebaseData.get())

        if(data.exists){
          this.user = data.get('isUser')
          this.mod = data.get('isMod')
          this.admin = data.get('isAdmin')
          return true
        } else {
          console.log("Data not found in the database.");
          return false;
        }
      } else {
        return false
      }
    }catch(error) {
      console.error("Error checking status:", error);
      return false;
    }
  }

  async getStatus(): Promise<{user: boolean, mod: boolean, admin: boolean}>{
    await this.checkStatus()
    return {user: this.user, mod: this.mod, admin: this.admin}
  }

  private async logout(){
    const userStorage = await this.sessionService.get('isLoggedIn')
    if(userStorage){
      await this.afAuth.signOut()
      this.sessionService.clear('isLoggedIn')
      console.log("Logout completed")
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    }
  }
  getLogout(){
    this.logout()
  }
}
