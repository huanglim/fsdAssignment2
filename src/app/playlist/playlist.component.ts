import { Component, OnInit } from '@angular/core';
import { AppVideo } from '../app-video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  videos: AppVideo[];
  selectedVideo: AppVideo;
  currentVideoElm: any;


  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getVideos();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getCurrentVideoElm();
  }

  getCurrentVideoElm() {
    this.currentVideoElm = this.videoService.getCurrentVideoElm();
  }

  getVideos() {
    this.videoService.getVideos().
      subscribe(videos => this.videos = videos)
  }

  playVideo(id: number) {
    this.videoService.getVideoById(id).
      subscribe(
        appVideo => {
        this.selectedVideo = appVideo;
          let isPaused = this.currentVideoElm.paused;
          this.currentVideoElm.src = this.selectedVideo.url;
          this.currentVideoElm.load();
          if (!isPaused) {
            this.currentVideoElm.play();
          }
        });

  }

  isPlaying(url: string): boolean {
    if (this.currentVideoElm) { console.log(this.currentVideoElm.src, url); return this.currentVideoElm.src === url }
    return false
  }
}
