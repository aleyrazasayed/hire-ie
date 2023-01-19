import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup
  constructor(private loginService: LoginService,
    public formBuilder: FormBuilder,    
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password:[''],
      isRecruiter:[false]
    })
  }

  onSubmit() {
      this.loginService.createUser({...this.registerForm.value})
      .then(() => {
        this.registerForm.reset();
        localStorage.clear();
        this.router.navigate(['login']);
      }).catch((err) => {
        console.log(err)
      });
  }

  

}
