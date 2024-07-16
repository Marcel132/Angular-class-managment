import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../modules/shared-module.module';
import { MainService } from '../../../services/main.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    SharedModuleModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {


  constructor(
    private mainService: MainService,
    private titleService: Title,
  ){
    this.titleService.setTitle('Strona główna');
  }

  isUser: boolean = false;
  isMod: boolean = false;
  isAdmin: boolean = false;
  handlerClick: boolean = false

  ngOnInit(): void {
    this.mainService.getStatus().then((status) => {
      this.isUser = status.user
      this.isMod = status.mod
      this.isAdmin = status.admin
    })
  }

}
