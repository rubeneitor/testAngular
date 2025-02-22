import { Component, OnInit } from '@angular/core';
import { SongsService, Song, Artist } from '../../services/songs.service';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from '../add-song/add-song.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompaniesService } from '../../services/companies.service';
import { ArtistsService } from '../../services/artists.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

declare var bootstrap: any; // Para Bootstrap modal manualmente

@Component({
  selector: 'app-list-songs',
  imports: [CommonModule, AddSongComponent, ReactiveFormsModule, TranslateModule, TranslatePipe],
  templateUrl: './list-songs.component.html',
  styleUrl: './list-songs.component.css'
})
export class ListSongsComponent implements OnInit {


  //Canciones
  songForm: FormGroup;
  songs: Song[] = [];
  selectedSong: any = null;
  genres: string[] = [];

  //Artistas
  artists: Artist[] = [];
  nameArtist: any = null;

  //Comapañias
  countryCompany: any = null;
  nameCompany: any = null; 


  constructor(
    private songsService: SongsService, 
    private companiesService: CompaniesService, 
    private artistsService: ArtistsService, 
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es')
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
    this.artistsService.getNameArtist(id).subscribe((data:any) => {
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

  //Añadir en la interfaz un género
  addGenre() {
    const genre = this.songForm.value.genre;
    if (genre && !this.genres.includes(genre)) {
      this.genres.push(genre);
      this.songForm.patchValue({ genre: '' });
    }
  }

  //Eliminar de la interfaz un género
  removeGenre(genre: string) {
    
    this.selectedSong.genre = this.selectedSong.genre.filter((g: string) => g !== genre);
    console.log(this.selectedSong.genre)
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
