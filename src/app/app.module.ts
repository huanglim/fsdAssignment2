import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PlayerComponent } from './player/player.component';
import { ControlsComponent } from './controls/controls.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MessageComponent } from './message/message.component';

import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AddPlayerComponent } from './add-player/add-player.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    PlayerComponent,
    ControlsComponent,
    PlaylistComponent,
    MessageComponent,
    AddPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
