import { Injectable, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AbstractControl, FormBuilder, FormGroup, Validators  } from '@angular/forms'
import { SessionService } from './session.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private authService: AuthService,
  ) { }

  checkValidEmail(control: AbstractControl){
    const invalidWords = ['/',',','\\',')','(','{','}','[',']','!','#','$','%','^','&','*','"',"'",'<','>',':',';','+','=', '?']

    if(control.value && invalidWords.some(word => control.value.includes(word))){
      return {invalidEmail: true}
    }
    if(control.value && !control.value.includes('@')){
      return {invalidEmail: true}
    }
    return null
  }
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


  private loginForm = this.fb.group({
    login_email: ['', [Validators.required, this.checkValidEmail]],
    login_password: ['', [Validators.required, this.checkValidPassword]]
  })
  getLoginForm(): FormGroup{
    return this.loginForm
  }

  private signupForm = this.fb.group({
    signup_email: ['', [Validators.required, this.checkValidEmail]],
    signup_password: ['', [Validators.required, this.checkValidPassword]]
  })
  getSignupForm(): FormGroup{
    return this.signupForm
  }

  submitted: boolean = false

  private async loginUser(email: string, password: string): Promise<boolean>{
    this.submitted = true
      try {
        if(this.loginForm.valid){
          const userCredentials = await this.afAuth.signInWithEmailAndPassword(email, password)
          if(userCredentials.user){
            this.sessionService.set('isLoggedIn', true);
            return true;
          } else {
            console.log("Cannot create credentials")
            return false
          }
        } else {
          console.log("Invalid data in forms")
          return false
        }

      } catch(error){
        console.error(error)
        return false
      }
  }
  getLoginUser(email: string, password: string){
    return this.loginUser(email, password)
  }

  private async signupUser(email: string, password: string): Promise<boolean> {
    this.submitted = true
    try {
      if(this.signupForm.valid){
        const userCredentials = await this.afAuth.createUserWithEmailAndPassword(email, password)
        if(userCredentials.user){
          const uid = userCredentials.user.uid
          this.sessionService.set('isLoggedIn', true)
          this.saveUserData(email, uid, password)
          this.firestore.collection('user_data').doc(uid).set({email: email})
          this.firestore.collection('status').doc(uid).set({isUser: true, isMod: false, isAdmin: false})
          return true
        } else {
          console.log("Cannot create credentials")
          return false
        }
      } else {
        console.log("Invalid data in forms")
        return false
      }
    }catch(error){
      console.error(error)
      return false
    }
  }
  getSignupUser(email: string, password: string){
    return this.signupUser(email, password)
  }

  checkLocalStorage(): boolean {
    if (typeof window !== 'undefined') {
      let localStorageLoggedIn: any = this.sessionService.get('isLoggedIn');
      if (localStorageLoggedIn) {
        return true;
      }
    }
    return false;
  }

  async saveUserData(email: string, uid: string, password: string){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    let createdAt = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`

    // Hashed a password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(password)
    console.log(hashedPassword)

    let schema = {
      email: email,
      uid: uid,
      password: hashedPassword,
      createdAt: createdAt,
      isVerify: false,
    }

    try {
      await this.firestore.collection('users').doc(uid).set(schema)
    } catch(error){
      console.log("Cannot save user in database")
    }


  }

  async checkStatus(){
    let userToken = await this.sessionService.get('isLoggedIn');
    const uid =  await this.authService.getUser()
    if(userToken&& uid){
      let firebaseData = this.firestore.collection('users').doc(uid)
      if( firebaseData ){
        return true;
      } else {
        return false
      }
    } else {
      return false;
    }
  }
}
