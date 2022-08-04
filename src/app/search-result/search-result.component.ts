import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: String = "";
  searchSub: Subscription | undefined;

  constructor(private router: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    this.searchSub = this.router.queryParams.subscribe(params=>{
      this.searchQuery = params['q'];
      this.data.searchArtists(this.searchQuery).subscribe(data=>{
        this.results = data.artists.items.filter(result=>result.images.length > 0);
      });
    });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

}
