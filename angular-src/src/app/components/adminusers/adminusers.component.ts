import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {


  constructor(private userService:UserService){

    this.userService.getUsers()
      .subscribe(users => {
        console.log("Data delivered");
        //this.users = users;
      });
  }

  ngOnInit() {
  }

}
