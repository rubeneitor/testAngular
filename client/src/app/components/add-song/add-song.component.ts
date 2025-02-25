import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SongsService } from '../../services/songs.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, TranslatePipe]
})
export class AddSongComponent {
  songForm: FormGroup;
  genres: string[] = [];
  companies: string[] = [];
  countries: string[] = ['USA', 'UK', 'Spain', 'Germany', 'France'];
  posters: string[] = ['http://dummyimage.com/400x600.png/ff4444/ffffff', 'http://dummyimage.com/400x600.png/5fa2dd/ffffff', 'http://dummyimage.com/400x600.png/dddddd/000000'];

  constructor(private fb: FormBuilder, private songsService: SongsService, private translate: TranslateService) {
    this.translate.setDefaultLang('es')
    this.songForm = this.fb.group({
      poster:['', Validators.required],
      title: ['', Validators.required],
      artists: ['', Validators.required],
      genre: [''],
      company: [''],
      country: [''],
      year: [''],
      rating: ['']
    });
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
    this.genres = this.genres.filter(g => g !== genre);
  }

  //Añade en la interfaz una compañia
  addCompany() {
    const company = this.songForm.value.company;
    if (company && !this.companies.includes(company)) {
      this.companies.push(company);
      this.songForm.patchValue({ company: '' });
    }
  }

  //Elimina de la interfaz una compañia
  removeCompany(company: string) {
    this.companies = this.companies.filter(c => c !== company);
  }

  onSubmit() {  
    if (this.songForm.valid) {
      const newSong = {
        ...this.songForm.value,
        genre: this.genres,
      };
      console.log('New Song:', newSong);
      this.songsService.addSong(newSong).subscribe((data:any) => {
        console.log(data)
      })
    }
  }
}
