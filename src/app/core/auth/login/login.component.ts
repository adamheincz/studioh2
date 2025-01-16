import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm: FormGroup;
  private authStatusSub: Subscription;
  private errorMessageSub: Subscription;
  errorMessage: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

    this.errorMessageSub = this.authService.getErrorMessage().subscribe( message => {
      this.errorMessage = message;
    });
    //this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
  }

  onLogin(){
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    this.loginForm.reset();
    this.authService.handleErrorMessage('');
  }

  ngOnDestroy(): void {
    this.errorMessageSub.unsubscribe();
    //this.authStatusSub.unsubscribe();
  }
}
