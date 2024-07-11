import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './modules/app.module';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AppModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private loginService: LoginService
  ){}
  title = 'managment-system';

  isLogged: boolean = this.loginService.checkLocalStorage()



}
