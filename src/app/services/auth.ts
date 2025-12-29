import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IuserData } from '../interfaces/iuser-data';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private httpclient : HttpClient) {}
  userData=new BehaviorSubject(null)
  registerApi(data: object) : Observable<any>
  {
    return this.httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
  }  
  loginApi(data: object) : Observable<any>
  {
    return this.httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
  }
  setUserData()
  {
    this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
  }
}
