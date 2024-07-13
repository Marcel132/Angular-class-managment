import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../modules/shared-module.module';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    SharedModuleModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(
    private mainService: MainService,
  ){}


  changeContent(){

  }
}
