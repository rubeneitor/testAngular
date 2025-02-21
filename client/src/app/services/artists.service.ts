import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Artist {
  id: number;
  name: string;
  bornCity: string;
  birthdate: string;
  img: string | null;
  rating: number;
  songs: number[]; 
}

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private apiUrlArtists = 'http://localhost:3000/artists'
  

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrlArtists)
  }

  getNameArtist(id: any): Observable<any>{
    return this.http.get<Artist>(this.apiUrlArtists);
  }

  
}
