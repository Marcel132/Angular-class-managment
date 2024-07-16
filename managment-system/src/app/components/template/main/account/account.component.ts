import { Component, HostListener, OnInit } from '@angular/core';
import { MainComponent } from '../main.component';
import { SharedModuleModule } from '../../../../modules/shared-module.module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MainComponent,
    SharedModuleModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{

  constructor(
    private mainContent: MainComponent,
    private titleService: Title,
  ){
    this.titleService.setTitle('Konto');
  }

  changeTemplate: string = 'isUser'

  isUser: boolean = this.mainContent.isUser
  isMod: boolean = this.mainContent.isMod
  isAdmin: boolean = this.mainContent.isAdmin;

  checked: string = ''

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.changeTemplate = this.isAdmin === true ? 'isAdmin' : (this.isMod === true ? 'isMod' : 'isUser')
    console.log(this.changeTemplate)
  }

  setChecked(value: string){
    this.checked = value;
  }

}
