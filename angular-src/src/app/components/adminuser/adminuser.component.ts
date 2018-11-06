import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
  public user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router
  ) {
    /*this.userService.getUser(id)
      .subscribe(data => {
        this.users = data.msg;
        //console.log(data);
      });*/
      this.route.params.subscribe(
        params => {
          //console.log(params);
          this.userService.getUser(params['id'])
            .subscribe(data => {
              this.user = data.msg[0];
              //console.log(data);
          });
         }
      );
  }

  ngOnInit() {
  }

  activateUser(user){

    this.userService.activateUser(user)
      .subscribe(data => {
        //console.log("My Res - "+data.message);

        if(data.success){
          ///user.active = true;

          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg+""],
            dismissible: true,
            timeout: 3000,
            type: 'success'
          });
          this.router.navigate(['/admin/users']);
        }
        else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg+""],
            dismissible: true,
            timeout: 3000,
            type: 'danger'
          });
        }
      });
  }
}
