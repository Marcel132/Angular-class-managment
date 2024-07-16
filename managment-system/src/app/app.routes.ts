import { Routes } from '@angular/router';
import { AccountComponent } from './components/template/main/account/account.component';
import { ResourcesComponent } from './components/template/main/resources/resources.component';
import { SettingsComponent } from './components/template/main/settings/settings.component';
import { MainComponent } from './components/template/main/main.component';
import { ContentComponent } from './components/template/main/content/content.component';

export const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'home', component: ContentComponent},
    {path: 'account', component: AccountComponent},
    {path: 'resources', component: ResourcesComponent},
    {path: 'settings', component: SettingsComponent},
  ]},
];
