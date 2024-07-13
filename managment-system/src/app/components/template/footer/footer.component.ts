import { Component } from '@angular/core';
import { SharedModuleModule } from '../../../modules/shared-module.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    SharedModuleModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
