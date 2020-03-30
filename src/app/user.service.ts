import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://cauken.herokuapp.com/api/users';
  }

  registro(formValues): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, formValues).toPromise();
  }

  login(formValues): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, formValues).toPromise();
  }

  checkToken(): Promise<any> {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    const body = {
      usertoken: token,
      userid: usuario
    }
    return this.httpClient.post(`${this.baseUrl}/checktoken`, body).toPromise();

  }

}
