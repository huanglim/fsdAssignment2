import { Component, OnInit, ElementRef } from '@angular/core';
import { VideoService } from "../video.service";
import { AppVideo } from '../app-video';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  currentVideo: AppVideo;
  currentVideoElm:any;

  constructor(
    private videoService: VideoService,
    private elm:ElementRef
    ) { }

  ngOnInit() {
    this.getCurrentVideo();
  }

  getCurrentVideo(): void {
    this.videoService.getVideo().
      subscribe(appvideo => this.currentVideo = appvideo)
  }

  getCurrentVideoElm(): void {
    this.currentVideoElm= this.elm.nativeElement.querySelector('#current-video');
    console.log(this.currentVideoElm)
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.getCurrentVideoElm();
    this.videoService.setCurrentVideoElm(this.currentVideoElm);
  }
}
