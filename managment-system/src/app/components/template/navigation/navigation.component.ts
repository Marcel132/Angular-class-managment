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
}
