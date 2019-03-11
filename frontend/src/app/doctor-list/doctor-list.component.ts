import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {DoctorService} from "../services/doctor.service";
import {HelperService} from "../services/helper.service";


@Component({
    selector: 'app-doctor-list',
    templateUrl: './doctor-list.component.html',
    styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
    users: Array<any> = [];
    specialities: Array<any> = [];
    form = this.fb.group({
        firstname: [null],
        'specialities.id': [[]],
        roles: ['DOCTOR']

    });

    constructor(private helper: HelperService,
                private fb: FormBuilder,
                private doctorService: DoctorService) {

        this.form.controls['specialities.id'].valueChanges.subscribe((ctrl) => {
                console.log(ctrl);
        });

        console.log(this.form.value);
        console.log(this.form.controls['roles'].value);
        console.log(this.form.controls['specialities.id'].value);

    }

    ngOnInit() {
        this.search();
        this.getSpecialities();
    }

    search() {
        const params: any = this.helper.jsonToQueryString(this.form.value);
        this
            .doctorService
            .search(params)
            .subscribe((result) => {
                this.users = result['hydra:member'];
            });
        ;

    }
    getSpecialities(){
        this
            .doctorService
            .getSpecialities()
            .subscribe((result) => {
                this.specialities = result['hydra:member'];
            });
        ;
    }
}

