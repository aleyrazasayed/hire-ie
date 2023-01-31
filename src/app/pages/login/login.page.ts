import { ToasterService } from './../../services/toaster.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  constructor(
    public router: Router,
    private vibration: Vibration,
    public loginService: LoginService,
    public fb: FormBuilder,
    public toastr: ToasterService
  ) {}

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      // username: [''],
      email: [''],
      password: [''],
    });
  }

  login() {
    this.loginService.getAllUsers().subscribe((resp) => {
      console.log(JSON.stringify(resp));
      const userobj = resp.filter(
        (user: any) => user.email === this.loginForm.get('email')?.value
      )[0];
      if (
        userobj &&
        userobj.password === this.loginForm.get('password')?.value
      ) {
        sessionStorage.setItem('email', this.loginForm.get('email')?.value);

        userobj['isRecruiter'] == 'true'
          ? this.router.navigate(['recruiter-home'])
          : this.router.navigate(['applicant-home']);
        userobj['isRecruiter'] == 'true'
          ? sessionStorage.setItem('isRecruiter', 'true')
          : sessionStorage.setItem('isRecruiter', 'false');
          sessionStorage.setItem('isCvAttached','false')

        this.loginService.setUser();
        this.vibration.vibrate(1000);
        this.toastr.presentToast('User logged in successfully', 'success');
      } else {
        this.toastr.presentToast('Invalid email or password', 'danger');
      }
    }),
      (err: any) => {
        ;
      };
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
    localStorage.clear();
  }
}
