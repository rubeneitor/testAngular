import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Song {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  year: number;
  duration: number;
  rating: number;
  artist: number;
}

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
export class SongsService {
  private apiUrlSongs = 'http://localhost:3000/songs';
  private apiUrlArtists = 'http://localhost:3000/artists'

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrlSongs);
  }

  addSong(song: any): Observable<any>{
    return this.http.post(this.apiUrlSongs, song)
  }

  getNameArtist(id: any): Observable<any>{
    return this.http.get<Artist>(this.apiUrlArtists);
  }

  getCountryCompanies(): Observable<Artist> {
    return this.http.get<Artist>(this.apiUrlArtists);
  }
}
