import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import{DoctorService} from "./services/doctor.service";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DoctorListComponent} from './doctor-list/doctor-list.component';
import {HttpClientModule} from "@angular/common/http";
import{ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {TokenService} from "./services/token.service";
import {AuthService} from "./services/auth.service";
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        AppComponent,
        DoctorListComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],

    providers: [DoctorService, TokenService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
