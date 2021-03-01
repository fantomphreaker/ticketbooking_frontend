import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  currentUserId!: string;
  CurrentUserName!: string;
  CurrentUserType!: string;
  constructor(
    private _authService:AuthService,
    private fb:FormBuilder,
    private _router:Router,
    ) { }

  ngOnInit(): void {
    this.createForms();
  }
  private createForms(): void{
    this.loginForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  

  login(){
    console.log('clicked');
    this._authService.userlogin(this.loginForm).subscribe(res=>{
      localStorage.setItem('token', res.token);
      this.loginForm.get('email')?.value
      if(res.usertype == "admin"){
          console.log(res.usertype);
          this._router.navigate([`events/`]);
      }else if(res.usertype == "artist"){
          this._router.navigate([`artist-page/${res.userid}`]);
      }else{
        const { redirect } = window.history.state;
        this._router.navigateByUrl(redirect || '');
      }
      this.currentUserId = res.userid;
      this.CurrentUserName = res.username;
      this.CurrentUserType = res.usertype;
    },
    err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['login']);
          }
          else{
            console.log(err);
          }
        }
    }
    );
  }

}
