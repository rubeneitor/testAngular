import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddSongComponent {
  songForm: FormGroup;
  genres: string[] = [];
  companies: string[] = [];
  countries: string[] = ['USA', 'UK', 'Spain', 'Germany', 'France'];
  posters: string[] = ['http://dummyimage.com/400x600.png/ff4444/ffffff', 'http://dummyimage.com/400x600.png/5fa2dd/ffffff', 'http://dummyimage.com/400x600.png/dddddd/000000'];

  constructor(private fb: FormBuilder, private songsService: SongsService) {
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

  addGenre() {
    const genre = this.songForm.value.genre;
    if (genre && !this.genres.includes(genre)) {
      this.genres.push(genre);
      this.songForm.patchValue({ genre: '' });
    }
  }

  removeGenre(genre: string) {
    this.genres = this.genres.filter(g => g !== genre);
  }

  addCompany() {
    const company = this.songForm.value.company;
    if (company && !this.companies.includes(company)) {
      this.companies.push(company);
      this.songForm.patchValue({ company: '' });
    }
  }

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
