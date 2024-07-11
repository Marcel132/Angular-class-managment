import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"managment-system-a6935","appId":"1:102417560224:web:24cfac57140b97aa184fc5","storageBucket":"managment-system-a6935.appspot.com","apiKey":"AIzaSyArVttw91kRwV3mMzkrqWhiIXJ_wWz2vcg","authDomain":"managment-system-a6935.firebaseapp.com","messagingSenderId":"102417560224","measurementId":"G-VNXT42RTWS"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
