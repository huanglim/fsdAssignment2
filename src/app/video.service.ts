import { Injectable, ElementRef } from '@angular/core';
import { AppVideo } from "./app-video";
import { Observable, of } from "rxjs";
import {map, tap, catchError} from 'rxjs/operators';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  currentVideoElm: any;
  private videosUrl = 'api/videos';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  // get all videos 
  getVideos(): Observable<AppVideo[]> {
    // return of(VIDEOS)
    return this.http.get<AppVideo[]>(this.videosUrl)
  }

  getVideo(): Observable<AppVideo> {
    let url = `${this.videosUrl}/11`;
    return this.http.get<AppVideo>(url)
    // return of(VIDEOS.find(appVideo => appVideo.id === 1))
  }

  getVideoById(id: number): Observable<AppVideo> {
    // return of(VIDEOS.find(appVideo => appVideo.id === id))
    const url = `${this.videosUrl}/${id}}`;
    return this.http.get<AppVideo>(url).pipe(
      tap(_ => this.messageService.add(`fetched video id = ${id}`)),
    )
  }

  updateVideo(video:AppVideo):Observable<any>{
    return this.http.put(this.videosUrl, video, httpOptions).pipe(
      tap(_=> this.messageService.add(`update video id = ${video.id}`))
    );
  }

  addVideo(video:AppVideo):Observable<AppVideo> {
    return this.http.post<AppVideo>(this.videosUrl, video, httpOptions).pipe(
      tap((newVideo) => this.messageService.add(`added video id`)),
      catchError(this.handleError<AppVideo>('addvideo'))
    )
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setCurrentVideoElm(elm: any): void {
    this.currentVideoElm = elm;
  }

  getCurrentVideoElm(): any {
    return this.currentVideoElm;
  }
}