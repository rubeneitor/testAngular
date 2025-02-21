import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Companies {
  id: number;
  name: string;
  country: string;
  createYear: number;
  employees: number;
  rating: number;
  songs: number[];
}


@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private apiUrlCompanies = 'http://localhost:3000/companies';

  constructor(private http: HttpClient) { }

  getCountryCompanies(song: any): Observable<Companies> {
      return this.http.get<Companies>(this.apiUrlCompanies);
  }

  getNamesCompanies(song: any): Observable<Companies> {
    return this.http.get<Companies>(this.apiUrlCompanies);
  }

  getCompanies(): Observable<Companies[]> {
    return this.http.get<Companies[]>(this.apiUrlCompanies)
  }
}