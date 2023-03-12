import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '../interface/repository.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiBaseUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  allRepos(): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.apiBaseUrl}/repositories`)
  }
}
