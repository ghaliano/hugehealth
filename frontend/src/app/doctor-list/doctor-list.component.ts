import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {DoctorService} from "../services/doctor.service";


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

    constructor(private fb: FormBuilder,
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
                    val = item;
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
        const tab: Array<number> = this.form.controls['specialities.id'].value;
        const index = tab.findIndex((el) => {
            return el == event.target.value;
        });
        if (index != -1){
            tab.splice(index, 1);
        } else {
            tab.push(parseInt(event.target.value));
        }

        this
            .form
            .controls['specialities.id']
            .patchValue(tab);

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

