import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  search(params:any)
  {
    return this.http.get('http://127.0.0.1:8000/api/users' + params)


  }
}
