import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getAuthorisationHeader() {
        return {
            'headers': new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            })
        }
    }
}
