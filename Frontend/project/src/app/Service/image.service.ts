import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly ImageUrl = "http://localhost:8000/media/"
  constructor(private http: HttpClient) { }

  addImage(val : any): Observable<string[]>{
    return this.http.post<string[]>("http://localhost:8000/SaveFile",val);
  }
}
