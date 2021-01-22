import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey = 'AIzaSyBl0G7x7mKZfwOszFj_MlKX7TahC_f0r4A';

  constructor(public httpClient: HttpClient) { }

  getVideosForChanel(channel, maxResults): Observable<Object> {
    const url = 'https://www.googleapis.com/youtube/v3/search?key='
      + this.apiKey + '&channelId='
      + channel + '&order=date&part=snippet &type=video,id&maxResults='
      + maxResults;

    const url1 = 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyBl0G7x7mKZfwOszFj_MlKX7TahC_f0r4A' +
      '&part=snippet,contentDetails,statistics,status';
    return this.httpClient.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }
}
