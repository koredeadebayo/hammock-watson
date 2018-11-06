import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import {ValidService} from './services/valid.service';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
//import { FlashMessagesModule } from 'angular2-flash-messages';

import { NgFlashMessagesModule } from 'ng-flash-messages';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { AdminpropertyComponent } from './components/adminproperty/adminproperty.component';
import { AdminusersComponent } from './components/adminusers/adminusers.component';
import { AdminuserComponent } from './components/adminuser/adminuser.component';
import { Header2Component } from './components/header2/header2.component';
import { AdmindashbreadcombComponent } from './components/admindashbreadcomb/admindashbreadcomb.component';

//import { HashLocationStrategy, LocationStrategy } from '@angular/common'
//{provide: LocationStrategy, useClass: HashLocationStrategy }


const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'profile',component:ProfileComponent},
  {path:'admin',component:AdminpanelComponent},
  {path:'admin/property',component:AdminpropertyComponent},
  {path:'admin/users',component:AdminusersComponent},
  {path:'admin/user/:id',component:AdminuserComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    Navbar2Component,
    AdminpanelComponent,
    AdminpropertyComponent,
    AdminusersComponent,
    AdminuserComponent,
    Header2Component,
    AdmindashbreadcombComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgFlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidService,AuthService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
