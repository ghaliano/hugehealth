import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenService} from "../services/token.service";
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    msgError: string;
    form: FormGroup = this.fb.group({
        username: [null],
        password: [null]


    });

    constructor(private fb: FormBuilder,
                private http: HttpClient,
                private router:Router,
                private authService: AuthService,
                private tokenService: TokenService) {
    }

    ngOnInit() {

    }

    login() {
        this
            .authService
            .login(this.form.value)
            .pipe(catchError((error) => {
                this.msgError = 'Bad credentials';
                return throwError('error');
            }))
            .subscribe((result) => {
                    this.authService.redirectIfAuthroized();
                }

            );
    }
}
