import { Routes } from '@angular/router';
import { ListSongsComponent } from './components/list-songs/list-songs.component';
import { ListArtistsComponent } from './components/list-artists/list-artists.component';

export const routes: Routes = [
    { path: 'songs', component: ListSongsComponent },
    { path: 'artists', component: ListArtistsComponent },
    { path: '', redirectTo: 'songs', pathMatch: 'full' }
];
