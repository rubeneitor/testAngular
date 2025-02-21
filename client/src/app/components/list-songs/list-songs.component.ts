import { Component, OnInit } from '@angular/core';
import { SongsService, Song, Artist } from '../../services/songs.service';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from '../add-song/add-song.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any; // Para Bootstrap modal manualmente

@Component({
  selector: 'app-list-songs',
  imports: [CommonModule, AddSongComponent, ReactiveFormsModule],
  templateUrl: './list-songs.component.html',
  styleUrl: './list-songs.component.css'
})
export class ListSongsComponent implements OnInit {
  songForm: FormGroup;
  songs: Song[] = [];
  selectedSong: any = null;

  artists: Artist[] = []
  nameArtist: any = null

  constructor(private songsService: SongsService, private fb: FormBuilder) {
    this.songForm = this.fb.group({
      title: [''],
      artist: [''],
      year: [''],
      genre: [''],
      label: [''],
      country: [''],
      poster: ['']
    });
  }

  ngOnInit(): void {
    this.getSongs();
  }

  //Obtiene la lista de canciones 
  getSongs(){
    this.songsService.getSongs().subscribe((data: Song[]) => {
      this.songs = data;
    });
  }

  //Obtiene el nombre del Artista
  getArtist(id: any){
    console.log(id)
    this.songsService.getNameArtist(id).subscribe((data:any) => {
      for(let idArtist of data){
        console.log(idArtist)
        if(idArtist.id == id){
          this.nameArtist = idArtist.name
          console.log(this.nameArtist)
        }
      }
      
    })
  }

  //Abre Modal de la canción
  openModal(song: Song) {
    this.selectedSong = song;
    const modalElement = document.getElementById('songModal');
    const modal = new bootstrap.Modal(modalElement);
    console.log(this.selectedSong)
    modal.show();
  }

}
