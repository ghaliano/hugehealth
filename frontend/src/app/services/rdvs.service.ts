import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {HelperService} from "./helper.service";

@Injectable({
    providedIn: 'root'
})
export class RdvsService {

    constructor(
        private helper: HelperService,
        private http: HttpClient,
        private tokenService: TokenService
    ) {
    }

    getRdvsByDoctor(id: number) {
        return this
            .http
            .get(
                'http://127.0.0.1:8000/api/rdvs'
                + this.helper.jsonToQueryString(
                    {doctor: id}
                ),
                this.tokenService.getAuthorisationHeader()
            );
    }
}
