import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {compileInjectable} from "@angular/compiler";
import {DoctorService} from "../services/doctor.service";


@Component({
    selector: 'app-doctor-list',
    templateUrl: './doctor-list.component.html',
    styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
    users: Array<any> = [];
    form = this.fb.group({
        firstname: [null],
        'specialities.id': this.fb.array([]),
        roles: ['DOCTOR']

    });

    constructor(private fb: FormBuilder,
                private doctorService: DoctorService) {

        this
             .form
             .controls['specialities.id']
             .patchValue([1, 2]);


    }

    ngOnInit() {
        this.search();
    }

    search() {
        const params: any = this.jsonToQueryString(this.form.value);
        this
            .doctorService
            .search(params)
            .subscribe((result) => {
                this.users = result['hydra:member'];
            });
        ;

    }


    jsonToQueryString(obj) {
        return Object.keys(obj).filter((key) => obj[key] != undefined && obj[key] != '').reduce((str, key, i) => {
            let delimiter: string, val;
            delimiter = (i === 0) ? '?' : '&';
            if (Array.isArray(obj[key])) {
                key = encodeURIComponent(key);
                let arrayVar = obj[key].reduce((str, item) => {
                    val = JSON.stringify(item);
                    return [str, key + "[]", '=', val, '&'].join('');
                }, '');
                return [str, delimiter, arrayVar].join('');
            } else {
                key = encodeURIComponent(key);
                val = obj[key];
                return [str, delimiter, key, '=', val].join('');
            }
        }, '');

    }

    onSpecialitiesChange(event: any) {

        this
            .form
            .patchValues({'specialities.id': [event.target.value]});
        console.log(this.form.value);
    }
}
