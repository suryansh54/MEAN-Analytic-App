import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit {

  constructor(private router: Router, private auth: AuthServiceService) { }

  userStatus: boolean;
  styleChangeClass: string = "dark";
  ngOnInit() {
    this.auth.userStatus().subscribe((status)=>{
      this.userStatus = status;
      if(status == true) {
        this.styleChangeClass = 'light';
      } else {
        this.styleChangeClass = 'dark';
      }
    });
  }

  goToLogin() :void{
    this.router.navigateByUrl('/user-auth');
  }

  goToApp() :void{
    this.router.navigateByUrl('/chart-one');
  }
}
