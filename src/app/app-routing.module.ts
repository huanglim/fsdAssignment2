import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AddPlayerComponent } from './add-player/add-player.component';


const routes: Routes = [
  { path: '', redirectTo: 'video-player', pathMatch: 'full' },
  { path: 'video-player', component: VideoPlayerComponent},
  { path: 'add-player', component: AddPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
