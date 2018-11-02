import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
//import { FlashMessagesModule } from 'angular2-flash-messages';

import { NgFlashMessagesModule } from 'ng-flash-messages';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { AdminpropertyComponent } from './components/adminproperty/adminproperty.component';
import { AdminusersComponent } from './components/adminusers/adminusers.component';



const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'profile',component:ProfileComponent},
  {path:'adminpanel',component:AdminpanelComponent},
  {path:'admin/property',component:AdminpropertyComponent},
  {path:'admin/users',component:AdminusersComponent}
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
    AdminusersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgFlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
