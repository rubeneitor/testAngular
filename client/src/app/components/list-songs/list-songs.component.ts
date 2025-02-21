import { Component, OnInit } from '@angular/core';
import { SongsService, Song, Artist } from '../../services/songs.service';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from '../add-song/add-song.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompaniesService } from '../../services/companies.service';

declare var bootstrap: any; // Para Bootstrap modal manualmente

@Component({
  selector: 'app-list-songs',
  imports: [CommonModule, AddSongComponent, ReactiveFormsModule],
  templateUrl: './list-songs.component.html',
  styleUrl: './list-songs.component.css'
})
export class ListSongsComponent implements OnInit {
  
  //Canciones
  songForm: FormGroup;
  songs: Song[] = [];
  selectedSong: any = null;

  //Artistas
  artists: Artist[] = [];
  nameArtist: any = null;

  //Comapañias
  countryCompany: any = null;
  nameCompany: any = null; 


  constructor(private songsService: SongsService, private companiesService: CompaniesService, private fb: FormBuilder) {
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

  //Obtiene el país de la canción a través de la compañia
  getContryCompanies(song: any){   
    this.companiesService.getCountryCompanies(song.id).subscribe((data:any) => {
      for(let idSong of data){
        console.log(idSong.songs)
        if(idSong.songs.includes(song.id)){
          console.log("SONGS", idSong.songs)
          this.countryCompany = idSong.country
          console.log("COMPAÑIA",this.countryCompany)
        }
      }
    })
  }

  //Obtiene el nombre de la compañia
  getNamesCompanies(song: any){   
    this.companiesService.getNamesCompanies(song.id).subscribe((data:any) => {
      for(let idSong of data){
        console.log(idSong.songs)
        if(idSong.songs.includes(song.id)){
          console.log("SONGS", idSong.songs)
          this.nameCompany = idSong.name
          console.log("COMPAÑIA",this.nameCompany)
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
