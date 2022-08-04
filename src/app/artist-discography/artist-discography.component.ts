import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: Array<Data> = [];
  artist: Data = [];
  artDiscSub: Subscription | undefined;
  artDiscID: any;

  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artDiscSub = this.route.params.subscribe(params=>{
      this.artDiscID = params['id'];
      this.data.getArtistById(this.artDiscID).subscribe(data=>this.artist=data);
      this.data.getAlbumsByArtistId(this.artDiscID).subscribe(data=>{
        this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
      });

    });
  }

  ngOnDestroy(): void {
    this.artDiscSub?.unsubscribe();
  }

}
