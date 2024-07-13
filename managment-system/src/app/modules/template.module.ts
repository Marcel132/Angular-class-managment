import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../components/template/navigation/navigation.component';
import { FooterComponent } from '../components/template/footer/footer.component';
import { MainContentComponent } from '../components/template/main-content/main-content.component';
import { MainService } from '../services/main.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NavigationComponent,
    FooterComponent,
    MainContentComponent,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    MainContentComponent,
  ],
  providers: [
    MainService,
  ]
})
export class TemplateModule {
}
