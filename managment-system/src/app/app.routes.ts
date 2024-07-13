import { Routes } from '@angular/router';
import { AccountComponent } from './components/template/main-content/account/account.component';
import { ResourcesComponent } from './components/template/main-content/resources/resources.component';
import { SettingsComponent } from './components/template/main-content/settings/settings.component';
import { MainContentComponent } from './components/template/main-content/main-content.component';

export const routes: Routes = [
  {path: 'main', component: MainContentComponent, children: [
  ]},
  {path: 'account', component: AccountComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'settings', component: SettingsComponent},
];
