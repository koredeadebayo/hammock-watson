import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../user';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  public all_users : any;
  public users: User[];

  constructor(
    private userService: UserService,
    private ngFlashMessageService: NgFlashMessageService
  ){

    this.userService.getUsers()
      .subscribe(data => {
        this.users = data.msg;
        //console.log(data);
      });
  }

  ngOnInit() {
  }

}
