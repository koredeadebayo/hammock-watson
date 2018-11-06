import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Users} from '../../../user';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  users: Users[];

  constructor(private userService:UserService){

    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnInit() {
  }

}
