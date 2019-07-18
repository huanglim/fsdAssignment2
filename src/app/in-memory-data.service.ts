import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

import { AppVideo } from "./app-video";
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const videos = [
      { id: 11, title: "Baby video", url: "./assets/videos/test1.mp4", status: true, approved:true, likes:0, unlikes:0, currentStatus:'',exitplayprogress:0 },
      { id: 12, title: "badminton video", url: "./assets/videos/test2.mp4", status: true, approved: true, likes: 0, unlikes: 0, currentStatus: '', exitplayprogress: 0 },
      { id: 13, title: "view video", url: "./assets/videos/test3.mp4", status: true, approved: true, likes: 0, unlikes: 0, currentStatus: '', exitplayprogress: 0 }
    ];
    return { videos };
  }

  genId(videos: AppVideo[]): number {
    return videos.length > 0 ?
      Math.max(...videos.map(video => video.id)) +1: 11;
  }

}
