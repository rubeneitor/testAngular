import { Component, OnInit } from '@angular/core';
import { SongsService, Song } from '../../services/songs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-songs',
  imports: [CommonModule],
  templateUrl: './list-songs.component.html',
  styleUrl: './list-songs.component.css'
})
export class ListSongsComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songsService: SongsService) {}

  ngOnInit(): void {
    this.getSongs();
  }

  //Obtiene la lista de canciones 
  getSongs(){
    this.songsService.getSongs().subscribe((data: Song[]) => {
      this.songs = data;
    });
  }

}
