import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getAllPost(): Promise<any> {
    return new Promise( (resolve, reject) => {
      try {
        this.http.get(`${environment.api}/posts`).subscribe( (posts: any) => {
          resolve(posts);
        });
      } catch(error) {
        reject(error);
      }
    });
  }

  public getPost(id: number):Promise<any> {
    return new Promise( (resolve, reject) => {
      try {
        this.http.get(`${environment.api}/posts/${id}`).subscribe( (post: any) => {
          resolve(post);
        });
      } catch(error) {
        reject(error);
      }
    });
  }

}
