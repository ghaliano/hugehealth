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
        roles: ['DOCTOR'],
        longitude: [null],
        latitude: [null],
        distance: [5]

    });

    lat: number = 51.678418;
    lng: number = 7.809007;
    displayType: string = 'list';

    constructor(private helper: HelperService,
                private fb: FormBuilder,
                private doctorService: DoctorService) {

    }

    toggleDisplay(displayType){
        this.displayType = displayType;
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation
                .getCurrentPosition((position) => {
                this.form.controls['longitude'].patchValue(position.coords.longitude);
                this.form.controls['latitude'].patchValue(position.coords.latitude);
                this.search();
                this.getSpecialities();
            }, () => {
                    alert("Vous ne pouvez pas accéder !");
            });
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
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

    getSpecialities() {
        this
            .doctorService
            .getSpecialities()
            .subscribe((result) => {
                this.specialities = result['hydra:member'];
            });
        ;
    }
}

