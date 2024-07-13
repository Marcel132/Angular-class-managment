import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from '../components/template/main-content/account/account.component';
import { ResourcesComponent } from '../components/template/main-content/resources/resources.component';
import { SettingsComponent } from '../components/template/main-content/settings/settings.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountComponent,
    ResourcesComponent,
    SettingsComponent,
  ],
  exports: [
    AccountComponent,
    ResourcesComponent,
    SettingsComponent,
  ],
})
export class MainModule { }
