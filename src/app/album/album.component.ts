import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: Data = [];
  albumSub: Subscription | undefined;
  albumID: any;

  constructor(private data: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  addToFavourites(trackID:string): void{
    this.albumSub = this.data.addToFavourites(trackID).subscribe(success=>{
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    },
    err=>{
      this.snackBar.open("Unable to add song to Favourites", "Retry",{ duration: 1500 });
    });
  }

  ngOnInit(): void {
    this.albumSub = this.route.params.subscribe(params=>{
      this.albumID = params['id'];
      this.data.getAlbumById(this.albumID).subscribe(data=>{
        this.album = data;
      });
    });

  }

  ngOnDestroy(): void {
    this.albumSub?.unsubscribe();
  }

}
