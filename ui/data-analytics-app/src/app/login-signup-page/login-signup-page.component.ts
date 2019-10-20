import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-page',
  templateUrl: './login-signup-page.component.html',
  styleUrls: ['./login-signup-page.component.scss']
})
export class LoginSignupPageComponent implements OnInit {

  
  constructor(private auth: AuthServiceService, private snackBar: MatSnackBar, public router: Router) { }

  loader: boolean = false;

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // Validation methods

  messageNotification(message: string, action: string, timeout: number) :void{
    this.snackBar.open(message, action, {
      duration: timeout
    });
  }

  signup() :void{
    this.loader = true;
    this.auth.signUp(JSON.stringify(this.signUpForm.value)).subscribe((data)=>{
      this.signUpForm.reset();
      this.messageNotification('User created successfully.' , 'Close', 2000);
      this.loader = false;
    }, error => {
        this.messageNotification(error.error.message,'Close', 2000);
        this.loader = false;
    })
  }

  login() :void{
    this.loader = true;
    this.auth.login(JSON.stringify(this.loginForm.value)).subscribe((data: any)=>{
      this.loginForm.reset();
      if(data.hasOwnProperty('token')){
        sessionStorage.setItem('userName', data.userName);
        sessionStorage.setItem('userEmail', data.userEmail);
        sessionStorage.setItem('token', data.token);
        this.router.navigateByUrl('/chart-one');
        this.messageNotification('Login successfully.' , 'Close', 2000);
        this.loader = false;
      }
    }, error => {
        this.messageNotification(error.error.message,'Close', 2000);
        this.loader = false;
    })
  }

  ngOnInit() {
    this.auth.userStatus().subscribe((status)=>{
      if(status) {
        this.router.navigateByUrl('/chart-one');
      }
    });
  }

}
