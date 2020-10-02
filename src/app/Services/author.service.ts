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
}
