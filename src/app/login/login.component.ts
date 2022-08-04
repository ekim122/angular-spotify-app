import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  user: User = {userName: "", password: "", _id: ""};
  warning: string = "";
  loading: boolean = false;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if (this.user.userName !== "" && this.user.password !== ""){
      this.loading = true;
      this.auth.login(this.user).subscribe(success=>{
        localStorage.setItem('access_token', success.token);
        this.warning="";
        this.loading = false;
        this.router.navigate(['/newReleases']);
      },
      (err)=>{
        this.loading = false;
        this.warning = err.error.message;
      })
    }
  }

}
