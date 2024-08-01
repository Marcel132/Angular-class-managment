import { Component } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {


  constructor(
    private titleService: Title,
  ){
    this.titleService.setTitle('Strona główna');
  }
}
