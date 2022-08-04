import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  favouritesSub: Subscription | undefined;

  constructor(private data: MusicDataService) { }

  removeFromFavourites(id:any){
    this.favouritesSub = this.data.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  ngOnInit(): void {
    this.favouritesSub = this.data.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy(): void {
    this.favouritesSub?.unsubscribe();
  }

}
