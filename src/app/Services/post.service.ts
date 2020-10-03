import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { InputConvertPost } from '../converts/inputConvertPost.convert';


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

  public getPostForDataTable(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(`${environment.api}/posts`).subscribe((posts: any) => {
          const inputConvertPost = new InputConvertPost(posts);
          resolve(inputConvertPost.convertPostForDataTable());
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public delete(id): Promise<any> {
    return new Promise( (resolve, reject) => {
      try{
        this.http.delete(`${environment.api}/posts/`+id).subscribe( (response:any) =>{
            resolve(response);
          });
      } catch(error) {
        reject(error);
      }
    });
  }

  public create(data): Promise<any> {
    return new Promise( (resolve, reject) => {
      try{
        this.http.post(`${environment.api}/posts`, data).subscribe( (response:any) =>{
          resolve(response);
        });
      }catch(error) {
        reject(error);
      }
    });
  }

  public update(id, data): Promise<any> {
    return new Promise( (resolve, reject) => {
      try{
        this.http.put(`${environment.api}/posts/`+id, data).subscribe( (response:any) =>{
          resolve(response);
        });
      }catch(error) {
        reject(error);
      }
    });
  }

}
