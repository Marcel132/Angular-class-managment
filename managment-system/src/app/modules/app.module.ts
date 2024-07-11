import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from './security.module';
import { TemplateModule } from './template.module';

// For firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../environment/environment';
import { AngularFireModule } from '@angular/fire/compat'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecurityModule,
    TemplateModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  exports: [
    SecurityModule,
    TemplateModule
  ],
  providers: [
    AngularFireModule
  ],
})
export class AppModule { }
