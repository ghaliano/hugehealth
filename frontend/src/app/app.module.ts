import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import{DoctorService} from "./services/doctor.service";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DoctorListComponent} from './doctor-list/doctor-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {TokenService} from "./services/token.service";
import {AuthService} from "./services/auth.service";
import { SignupComponent } from './signup/signup.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { RdvAddComponent } from './rdv-add/rdv-add.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FlatpickrModule } from 'angularx-flatpickr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RdvsService} from "./services/rdvs.service";
import {HelperService} from "./services/helper.service";
import { ModalModule } from 'ngx-bootstrap/modal'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        DoctorListComponent,
        LoginComponent,
        SignupComponent,
        RdvAddComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        NgbModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        FlatpickrModule.forRoot(),
        ModalModule.forRoot()

    ],

    providers: [
        HelperService,
        RdvsService,
        DoctorService,
        TokenService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
