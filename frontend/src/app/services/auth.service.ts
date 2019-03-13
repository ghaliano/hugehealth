import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router,
                private http: HttpClient,
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

    isAuthorized(error){
        return error.status != 401;
    }

    redirectIfNotAuthroized(error){
        if (!this.isAuthorized(error)){
            this.setReferer(this.router.url);
            this.router.navigate(['login']);
        }
    }

    redirectIfAuthroized(){
        let url = [""];
        if (this.getReferer()){
            url = [this.getReferer()];
            this.removeReferer();
        }
        this.router.navigate(url);
    }

    setReferer(referer){
        localStorage.setItem('referer', referer)
    }

    getReferer(){
        return localStorage.getItem('referer');
    }

    removeReferer(){
        return localStorage.getItem('referer');
    }
}
