import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    public service:ServiceService,
    public router: Router){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {      
      this.service.loginCheck('api/token/',this.loginForm.value).subscribe((res:any)=>{        
        if(res.body['access']){
          localStorage.setItem('token',res.body['access'])
          localStorage.setItem('refresh',res.body['refresh'])
          this.router.navigateByUrl('forms')
        }else{
          Swal.fire({
            title: 'Invalid Username or Password',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },(error)=>{
        Swal.fire({
          title: 'Invalid Username or Password',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
    }
  }
}
