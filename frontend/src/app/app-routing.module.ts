import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";
import {DoctorListComponent} from "./doctor-list/doctor-list.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

export const routes: Routes = [
    {path: '', component: DoctorListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
