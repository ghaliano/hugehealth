import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    constructor(
        private http: HttpClient,
        private tokenService: TokenService) {
    }

    search(params: any) {
        return this.http.get('http://127.0.0.1:8000/api/users' + params)


    }

    getSpecialities() {
        return this
            .http
            .get(
                'http://127.0.0.1:8000/api/specialities',
                this.tokenService.getAuthorisationHeader()

            )
            ;
    }
}
