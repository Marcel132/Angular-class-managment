import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionService } from './session.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private user: boolean = false;
  private mod: boolean = false;
  private admin: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private sessionService: SessionService
  ) { }

  private async checkStatus(): Promise<boolean>{    try {
      let userStorage = this.sessionService.get('manageSystemSession')
      if(userStorage){
        const dataRef = this.firestore.collection('status').doc(userStorage.email)
        const data = await firstValueFrom(dataRef.get())

        if(data.exists){
          const isAdmin = data.get('isAdmin')
          const isMod = data.get('isMod')

          this.admin = isAdmin === true
          this.mod = isMod === true
          this.user = !isAdmin && !isMod

          return true

        } else {
          console.log("Data not found in the database.");
          return false;
        }
      } else {
        console.error("User session not found.");
        return false;
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
}
