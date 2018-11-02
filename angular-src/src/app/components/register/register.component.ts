import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ValidService } from '../../services/valid.service';
import { AuthService } from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  //private flashMessage: FlashMessagesService
  constructor(
    private validService: ValidService,
    private ngFlashMessageService: NgFlashMessageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    //Required Fields
    if(!this.validService.validRegister(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please fill in all fields"],
        dismissible: true,
        timeout: 3000,
        type: 'danger'
      });

      return false;
    }
    //Validate Emails
    if(!this.validService.validEmail(user.email)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please use a valid email"],
        dismissible: true,
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.ngFlashMessageService.showFlashMessage({
          messages: ["You are now registered and can log in"],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate(['/login']);
      }
      else{
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Something went wrong"],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(['/register']);
      }
    });

  }

}
