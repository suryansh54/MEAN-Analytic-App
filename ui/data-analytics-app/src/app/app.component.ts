import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  header: boolean = false;
  userName: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthServiceService){}

  checkRoutes(){
    if(this.router.url == '/' || this.router.url == '/user-auth') {
      return false;
    } else {
      this.getUserName();
      return true;
    }
  }

  showHeader(){
    this.header = this.checkRoutes();
  }

  logout(){
    this.auth.logout();
  }

  ngOnInit(){
    
  }

  getUserName(){
    this.auth.userInformation().subscribe((data)=>{
      this.userName = data.userName;
    });
  }

  ngDoCheck(){
    this.showHeader();
  }
}
