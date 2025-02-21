import { Routes } from '@angular/router';
import { ListSongsComponent } from './components/list-songs/list-songs.component';

export const routes: Routes = [
    { path: 'songs', component: ListSongsComponent },
    { path: '', redirectTo: 'songs', pathMatch: 'full' }
];
