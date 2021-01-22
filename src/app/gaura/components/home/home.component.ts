import {Component, OnInit} from '@angular/core';
import {YoutubeService} from '../../services/youtube.service';
import {VideoItem, YoutubeSearchData} from '../../interfaces/youtube-search-data';

@Component({
  selector: 'gm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  youTubeVideos: Array<VideoItem>;
  youTubeVideoId: string;

  constructor(
    private youtubeService: YoutubeService
  ) {
  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.youtubeService.getVideosForChanel('UCnG7VC-QyElNaISlplJ2Zxw', 10)
      .subscribe((youtubeSearchData: YoutubeSearchData) => {
        console.log('HomeComponent | data:%o', youtubeSearchData);
        this.youTubeVideos = youtubeSearchData.items;
      });

  }

  playVideo(videoId: string) {
    this.youTubeVideoId = videoId;
  }

}
