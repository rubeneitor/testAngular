import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ArtistsService, Artist } from '../../services/artists.service';

@Component({
  selector: 'app-list-artists',
  imports: [CommonModule],
  templateUrl: './list-artists.component.html',
  styleUrl: './list-artists.component.css'
})
export class ListArtistsComponent {
  //Artistas
  artists: Artist[] = [];

  defaultImage = 'http://dummyimage.com/600x400.png/ff4444/ffffff'; // Imagen por defecto

  constructor(private artistsService: ArtistsService) {}

  ngOnInit(): void {
    this.getArtists();
  }

  //Obtiene la lista de artistas
  getArtists(){
    this.artistsService.getArtists().subscribe((data: any) => {
      this.artists = data;
    })
  }

  // Obtiene la imagen del artista y si no tiene pone una por defecto
  getArtistImage(artist: Artist): string {
    return artist.img || this.defaultImage
  }

}
