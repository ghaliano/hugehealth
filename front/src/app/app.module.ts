import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import{DoctorService} from "./services/doctor.service";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DoctorListComponent} from './doctor-list/doctor-list.component';
import {HttpClientModule} from "@angular/common/http";
import{ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        DoctorListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],

    providers: [DoctorService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
