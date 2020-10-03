import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { InputConvertAuthor } from '../converts/inputConvertAuthor.convert';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  public getAllAuthor(): Promise<any> {
    return new Promise( (resolve, reject) => {
      try {
        this.http.get(`${environment.api}/authors`).subscribe( (autors: any) => {
          resolve(autors);
        });
      } catch(error) {
        reject(error);
      }
    });
  }

  public getMediatorsForDataTable(queryParameters?: String): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(`${environment.api}/authors?${queryParameters}`).subscribe((authors: any) => {
          const inputConvertAuthor = new InputConvertAuthor(authors);
          resolve(inputConvertAuthor.convertAuthorForDataTable());
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public delete(id): Promise<any> {
    return new Promise( (resolve, reject) => {
      try{
        this.http.delete(`${environment.api}/authors/`+id).subscribe( (response:any) =>{
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
        this.http.post(`${environment.api}/authors`, data).subscribe( (response:any) =>{
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
        this.http.put(`${environment.api}/authors/`+id, data).subscribe( (response:any) =>{
          resolve(response);
        });
      }catch(error) {
        reject(error);
      }
    });
  }
}
