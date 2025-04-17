import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
   private apiUrl='https://opentdb.com/api.php?amount=10'
  constructor(private http:HttpClient) { }

  getQuizzes( category ?:string , difficulty?:string): Observable<any> {
    let params = new HttpParams().set('amount','10')
    
    if (category) params = params.set('category', category);
    if (difficulty) params = params.set('difficulty', difficulty);

    return this.http.get(this.apiUrl, { params });
    // return this.http.get(`${this.apiUrl}`)
  }

 
}
