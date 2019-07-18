import { Component, OnInit } from '@angular/core';
import { AppVideo } from "../app-video";
import { VideoService } from '../video.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  video: AppVideo = {
    id: undefined,
    title: '',
    url: '',
    status: '',
    approved: false,
    likes: 0,
    unlike: 0,
    currentStatus: '',
    exitplayprogress: 0
  };
  videos: AppVideo[];

  checkoutForm: any;
  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideos().subscribe(videos => this.videos = videos)
  }

  onCancel() {
  }
  onSubmit(): void {
    console.log("in the submit");
    this.videoService.addVideo(this.video).subscribe(
      newVideo => {
        console.log('added the video');
        this.videos.push(newVideo);
        this.videos.forEach(element => {
          console.log(element.title)
        });
      }
    );
  }
}
