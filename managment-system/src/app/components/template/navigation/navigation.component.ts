import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  @Output() myEvent = new EventEmitter<boolean>();

  constructor(
    private mainService: MainService
  ){}

  enabledMenu: boolean = true;

  ngOnInit() {
  }

  showMenu(){
    this.enabledMenu = !this.enabledMenu;
    this.myEvent.emit(this.enabledMenu);
  }

  // This function is for mobile devices that screen in less than 600px, because on this devices navigation bar should close after click on the link
  showMenuMobile(){
    if(window.innerWidth < 600){
      this.enabledMenu = !this.enabledMenu;
      this.myEvent.emit(this.enabledMenu);
    }

  }

  // Logout from app
  logout(){
    this.mainService.getLogout()
  }
}
