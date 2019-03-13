import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import{DoctorService} from "./services/doctor.service";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DoctorListComponent} from './doctor-list/doctor-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
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
import {AgmCoreModule} from "@agm/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { StatsComponent } from './stats/stats.component';
import {StatsService} from "./services/stats.service";
import {ChartsModule} from "ng2-charts";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        DoctorListComponent,
        LoginComponent,
        SignupComponent,
        RdvAddComponent,
        StatsComponent
    ],
    imports: [
        BrowserModule,
        ChartsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        NgbModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA_omHG_CkyW4mTb8g7DsrviNFm25r0m7c'
        }),
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
        AuthService,
        StatsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
