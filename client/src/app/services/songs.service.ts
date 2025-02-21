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

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private apiUrlSongs = 'http://localhost:3000/songs';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrlSongs);
  }
}
