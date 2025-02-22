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

  loadedPage = false;


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
  getSongs() {
    this.songsService.getSongs().subscribe((data: Song[]) => {
      this.songs = data;
    });
    this.loadedPage = true


  }

  //Obtiene el nombre del Artista
  getArtist(id: any) {
    this.artistsService.getNameArtist(id).subscribe((data: any) => {
      for (let idArtist of data) {
        if (idArtist.id == id) {
          this.nameArtist = idArtist.name
        }
      }

    })
  }

  //Obtiene el país de la canción a través de la compañia
  getContryCompanies(song: any) {
    this.companiesService.getCountryCompanies(song.id).subscribe((data: any) => {
      for (let idSong of data) {
        if (idSong.songs.includes(song.id)) {
          this.countryCompany = idSong.country
        }
      }
    })
  }

  //Obtiene el nombre de la compañia
  getNamesCompanies(song: any) {
    this.companiesService.getNamesCompanies(song.id).subscribe((data: any) => {
      for (let idSong of data) {
        if (idSong.songs.includes(song.id)) {
          this.nameCompany = idSong.name
        }
      }
    })
  }

  //Eliminar de la interfaz un género
  removeGenre(genre: string) {

    this.selectedSong.genre = this.selectedSong.genre.filter((g: string) => g !== genre);
  }

  //Abre Modal de la canción
  openModal(song: Song) {
    this.selectedSong = song;
    const modalElement = document.getElementById('songModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

}
