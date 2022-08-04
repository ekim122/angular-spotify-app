import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy{

  releases: Array<Data> = [];
  releasesSub: Subscription | undefined;

  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.releasesSub = this.data.getNewReleases().subscribe(data=>{
      this.releases = data.albums.items
    });
  }

  ngOnDestroy(): void {
    this.releasesSub?.unsubscribe();
  }

}
