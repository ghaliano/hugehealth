import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    getDoctorStats(){
        return this
            .http
            .get(
                'http://127.0.0.1:8000/api/doctor/stats',
                this.tokenService.getAuthorisationHeader()
            );
    }
    getSpecialityStats(){
        return this
            .http
            .get(
                'http://127.0.0.1:8000/api/speciality/stats',
                this.tokenService.getAuthorisationHeader()
            );
    }
}
