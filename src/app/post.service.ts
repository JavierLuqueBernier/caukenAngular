import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post';


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
}
