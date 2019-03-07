import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";
import {DoctorListComponent} from "./doctor-list/doctor-list.component";

export const routes: Routes = [
    {path: '', component: DoctorListComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
