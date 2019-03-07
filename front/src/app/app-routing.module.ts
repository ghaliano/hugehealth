import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";
import {ContactComponent} from "../../../../notebook_new/frontend/src/app/contact/contact.component";
import {NumeroComponent} from "../../../../notebook_new/frontend/src/app/numero/numero.component";
import {ContactAddComponent} from "../../../../notebook_new/frontend/src/app/contact-add/contact-add.component";
import {ContactEditComponent} from "../../../../notebook_new/frontend/src/app/contact-edit/contact-edit.component";
import {NumberComponent} from "../../../../notebook_new/frontend/src/app/number/number.component";
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
