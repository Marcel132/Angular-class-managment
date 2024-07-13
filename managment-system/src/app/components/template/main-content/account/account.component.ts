import { Component } from '@angular/core';
import { MainContentComponent } from '../main-content.component';
import { SharedModuleModule } from '../../../../modules/shared-module.module';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MainContentComponent,
    SharedModuleModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(
    private mainContent: MainContentComponent
  ){}

  isUser: boolean = this.mainContent.isUser
  isMod: boolean = this.mainContent.isMod
  isAdmin: boolean = this.mainContent.isAdmin;

}
