/********************************************************************************* 
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Eun Dong Kim   Student ID: 144692209   Date: July 29th, 2022
*
* Angular App (Deployed) Link: https://amazing-piroshki-510226.netlify.app/
*
* User API (Heroku) Link: https://afternoon-sands-77004.herokuapp.com/api/user
*
*********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web422-a4';
  searchString: string = "";
  token: any;

  constructor(private router: Router, private auth: AuthService){}

  handleSearch(){
    this.router.navigate(['/search'],{
      queryParams:{q:this.searchString}
    });
    this.searchString = ''
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
