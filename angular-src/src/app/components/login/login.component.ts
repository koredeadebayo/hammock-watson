import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      console.log(data.message);

      if(data.success){
        this.authService.storeUserData(data.token, data.user);

        this.ngFlashMessageService.showFlashMessage({
          messages: ['You are now logged in'],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });

        this.router.navigate(['/dashboard']);
      }
      else{
        this.ngFlashMessageService.showFlashMessage({
          messages: [data.message],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });

      }
    });
  }
}
