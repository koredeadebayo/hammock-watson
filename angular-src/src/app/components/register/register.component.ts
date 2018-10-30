import { Component, OnInit } from '@angular/core';
import { ValidService } from '../../services/valid.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
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
  constructor(private validService: ValidService) { }

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
      console.log("Fill in all fields");
      //this.flashMessage.show("Please fill in all fields",{cssClass:'alert-danger', timeout: 3000});
      return false;
    }
    //Validate Emails
    if(!this.validService.validEmail(user.email)){
      console.log("Use Valid Email");
      //this.flashMessage.show("Please use a valid email",{cssClass:'alert-danger', timeout: 3000});
      
      return false;
    }
  }

}
