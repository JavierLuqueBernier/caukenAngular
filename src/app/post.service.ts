import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = 'http://localhost:3000/api/posts';

  }

  getAll(): Promise<any> {
    return this.httpClient.get(this.baseUrl).toPromise();
  }

  getById(id): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`).toPromise();
  }

  /* getIdPadre(fk_id_anterior): Promise<any> //hay que hacer un subscribe?
 {
    return this.httpClient.get(`${this.baseUrl}/${fk_id_anterior}`).toPromise();
 } */

  getCovers(parameters): Promise<any> {
    console.log('' + parameters);
    return this.httpClient.post(`${this.baseUrl}/covers`, parameters).toPromise();
  }

  getChildren(parameters): Promise<any> {
    console.log('' + parameters);
    return this.httpClient.post(`${this.baseUrl}/children`, parameters).toPromise();
  }

  getLikes(parameters): Promise<any> {
    console.log('Servicio recibe parámetro likes');
    console.log(parameters);
    return this.httpClient.post(`${this.baseUrl}/likes`, parameters).toPromise();
  }

  checkLike(id): Promise<any> {
    const userid = localStorage.getItem('usuario');
    const usertoken = localStorage.getItem('token');
    const body = {
      userid: userid,
      usertoken: usertoken,
      postid: id
    };
    return this.httpClient.post(`${this.baseUrl}/checklike`, body).toPromise();
  }

  create(newPostForm): Promise<any> {
    console.log(newPostForm);
    newPostForm.id = localStorage.getItem('usuario');
    newPostForm.usertoken = localStorage.getItem('token');
    console.log(newPostForm);
    return this.httpClient.post(`${this.baseUrl}/create`, newPostForm).toPromise();
  }

  putLike(id): Promise<any> {
    const userid = localStorage.getItem('usuario');
    const usertoken = localStorage.getItem('token');
    const body = {
      userid: userid,
      usertoken: usertoken,
      postid: id
    };
    return this.httpClient.put(`${this.baseUrl}/likes`, body).toPromise();
  }
  /*  dummy(idAlumno: string): Promise<any> {
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       }),
       body: {
         studentId: idAlumno
       }
     };
     return this.httpClient.delete(this.baseUrl, httpOptions).toPromise();
     //Delete por URL
     /*  return this.httpClient.delete(this.baseUrl+`/${idAlumno}`).toPromise(); */
}


