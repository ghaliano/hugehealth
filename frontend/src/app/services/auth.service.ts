import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    login(data: any) {
        let options = {
            headers: this._getHeaders()
        };

        return this
            .http
            .post(
                'http://127.0.0.1:8000/api/login_check',
                JSON.stringify(data),
                options
            )
            .pipe(map((result: any) => {
                this.tokenService.setToken(result.token);

                return result;
            }));
    }

    signup(data: any) {
        return this
            .http
            .post(
                'http://127.0.0.1:8000/api/signup',
                JSON.stringify(data),
                {
                    headers: this._getHeaders()
                }
            );
    }

    private _getHeaders(): HttpHeaders {
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return header;
    }
}
