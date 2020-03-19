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

  getCovers(parameters): Promise<any> {
    console.log('' + parameters);
    return this.httpClient.post(`${this.baseUrl}/covers`, parameters).toPromise();
  }

  getChildren(parameters): Promise<any> {
    console.log('' + parameters);
    return this.httpClient.post(`${this.baseUrl}/children`, parameters).toPromise();
  }


  create(newPostForm): Promise<any> {
    console.log(newPostForm);
    return this.httpClient.post(this.baseUrl, newPostForm).toPromise();
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


