import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  public user: any;

  constructor(
    private userService: UserService,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
