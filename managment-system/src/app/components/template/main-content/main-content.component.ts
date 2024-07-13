import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../modules/shared-module.module';
import { MainService } from '../../../services/main.service';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    SharedModuleModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {


  constructor(
    private mainService: MainService
  ){}

  isUser: boolean = false;
  isMod: boolean = false;
  isAdmin: boolean = false;
  handlerClick: boolean = false

  ngOnInit(): void {
    this.mainService.getStatus().then((status) => {
      this.isUser = status.user
      this.isMod = status.mod
      this.isAdmin = status.admin
      console.log("Status in component:", this.isUser, this.isMod, this.isAdmin);
    })
  }

}
