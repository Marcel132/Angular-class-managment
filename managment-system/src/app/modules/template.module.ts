import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../components/template/navigation/navigation.component';
import { FooterComponent } from '../components/template/footer/footer.component';
import { MainComponent } from '../components/template/main/main.component';
import { MainService } from '../services/main.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NavigationComponent,
    FooterComponent,
    MainComponent,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    MainComponent,
  ],
  providers: [
    MainService,
  ]
})
export class TemplateModule {
}
