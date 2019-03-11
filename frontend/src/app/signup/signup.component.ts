import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: [null],
    plainPassword: [null],
    firstname: [null],
    lastname: [null],
    tel: [null],
    email: [null],
    address: [null],
    bornAt: [null]
  });

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {

  }

  signup(){
    this
        .auth
        .signup(this.form.value)
        .pipe(catchError((error) => {
      console.log(error);
      return throwError('Internal error');
    })).subscribe((result) => {
        this.router.navigate(['login']);
    });
  }

}
