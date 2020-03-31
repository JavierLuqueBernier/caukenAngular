import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {

    /* this.baseUrl = 'https://cauken.herokuapp.com/api/posts'; */
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
    return this.httpClient.post(`${this.baseUrl}/covers`, parameters).toPromise();
  }

  getChildren(parameters): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/children`, parameters).toPromise();
  }

  findMostLikedChild(parameters): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/likedchild`, parameters).toPromise();
  }

  getAncestors(parameters): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/ancestors`, parameters).toPromise();
  }

  getLikes(parameters): Promise<any> {
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

  getComments(parameters): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/comments`, parameters).toPromise();
  }

  createComment(commentForm): Promise<any> {
    commentForm.fk_usuario = commentForm.userid = localStorage.getItem('usuario');
    commentForm.usertoken = localStorage.getItem('token');
    console.log(commentForm);
    return this.httpClient.post(`${this.baseUrl}/comments/create`, commentForm).toPromise();
  }

  deleteComment(parameters): Promise<any> {
    parameters.userid = localStorage.getItem('usuario');
    parameters.usertoken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: parameters
    };
    console.log(parameters);
    return this.httpClient.delete(`${this.baseUrl}/comments/delete`, httpOptions).toPromise();
  }

  find(parameters): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/find`, parameters).toPromise();
  }


  create(newPostForm): Promise<any> {
    newPostForm.fk_usuario = newPostForm.userid = localStorage.getItem('usuario');
    newPostForm.usertoken = localStorage.getItem('token');
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

  getByUser(parameters): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/getbyuser`, parameters).toPromise();
  }

  getPrivateByUser(parameters) {
    parameters.userid = localStorage.getItem('usuario');
    parameters.usertoken = localStorage.getItem('token');
    return this.httpClient.post(`${this.baseUrl}/privatebyuser`, parameters).toPromise();
  }

  getReadsByUser(parameters) {
    parameters.fk_usuario = parameters.userid = localStorage.getItem('usuario');
    parameters.usertoken = localStorage.getItem('token');
    return this.httpClient.post(`${this.baseUrl}/userreads`, parameters).toPromise();
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


