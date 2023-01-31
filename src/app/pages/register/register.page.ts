import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  registerForm!: FormGroup
  constructor(private loginService: LoginService,
    public formBuilder: FormBuilder,    
    private router: Router,
    public toastr: ToasterService) { }

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
    if(this.expression.test(this.registerForm.value.email)){
      this.loginService.createUser({...this.registerForm.value})
      .then(() => {
        this.registerForm.reset();
        localStorage.clear();
        this.router.navigate(['login']);
      }).catch((err) => {
        
      });
    } else {
      this.toastr.presentToast('Enter valid email', 'warning');
    }
  }

  

}
