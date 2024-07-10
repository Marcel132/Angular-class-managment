import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from './security.module';
import { TemplateModule } from './template.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecurityModule,
    TemplateModule
  ],
  exports: [
    SecurityModule,
    TemplateModule
  ]
})
export class AppModule { }
