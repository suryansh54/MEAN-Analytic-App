import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-signup-page',
  templateUrl: './login-signup-page.component.html',
  styleUrls: ['./login-signup-page.component.scss']
})
export class LoginSignupPageComponent implements OnInit {

  
  constructor(private auth: AuthServiceService, private snackBar: MatSnackBar) { }

  loader: boolean = false;

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  // Validation methods

  messageNotification(message: string, action: string, timeout: number) :void{
    this.snackBar.open(message, action, {
      duration: timeout
    });
  }

  login() :void{
    console.log("sdfsdf", this.loginForm.value);
  }

  signup() :void{
    this.loader = true;
    this.auth.signUp(JSON.stringify(this.signUpForm.value)).subscribe((data)=>{
      this.messageNotification('User created successfully.' , 'Close', 2000);
      this.loader = false;
    }, error => {
        this.messageNotification(error.error.message,'Close', 2000);
        this.loader = false;
    })
  }

  ngOnInit() {
  }

}
