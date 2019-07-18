import { Component, OnInit, ElementRef } from '@angular/core';
import { VideoService } from '../video.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  currentVideoElm: any;
  progressElm: any;
  isPlayed: boolean;
  isHeadphones: boolean = true;
  likes: number = 0;
  unlikes: number = 0;
  timer: any;

  constructor(private elm: ElementRef,
    private videoService: VideoService,
    private messageService: MessageService,
  ) { }

  initVideo(): void {
    this.currentVideoElm.controls = false;
    this.currentVideoElm.volume = 0.5;
    this.isHeadphones = true;
    this.progressElm.value = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.currentVideoElm = this.videoService.getCurrentVideoElm();
    this.progressElm = this.elm.nativeElement.querySelector("progress");
    console.log(this.currentVideoElm, this.progressElm);
    this.initVideo();
  }

  videoPlay(): void {
    this.currentVideoElm.play();
    this.isPlayed = true;
    // this.timer = setInterval(this.progressControl,1000);
    this.timer = setInterval(() => { this.progressElm.value = this.currentVideoElm.currentTime / this.currentVideoElm.duration; },
      1000);
    this.messageService.add("Start play the video")
  }

  videoPause() {
    this.currentVideoElm.pause();
    this.isPlayed = false;
    clearInterval(this.timer);

    this.messageService.add("pause the video")
  }

  videoPlus() {
    if (this.currentVideoElm.volume <= 0.9) {
      this.currentVideoElm.volume += 0.1;
      this.messageService.add(`plus the volume, current volume is ${this.currentVideoElm.volume}`)
    }
  }

  videoMinus() {
    if (this.currentVideoElm.volume >= 0.1) {
      this.currentVideoElm.volume -= 0.1;
      this.messageService.add(`minus the volume, current volume is ${this.currentVideoElm.volume}`)
    }
  }

  videoRefresh() {
    this.currentVideoElm.load();
    this.messageService.add('The video is reloaded;');
    this.initVideo();
  }

  videoToggleMute() {
    if (this.isHeadphones) {
      this.isHeadphones = false;
    } else {
      this.isHeadphones = true;
    }
  }

  videoLike() {
    this.likes += 1;
  }

  videoUnlike() {
    this.unlikes += 1;
  }

  progressControl() {
    this.progressElm.value = this.currentVideoElm.currentTime / this.currentVideoElm.duration;
  }
}