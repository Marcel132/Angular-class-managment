import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { SharedModuleModule } from '../../../modules/shared-module.module';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    SharedModuleModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  @Output() myEvent = new EventEmitter<boolean>();

  constructor(
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
}
