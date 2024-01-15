import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<any>();
  hide = true;
  login!: FormGroup
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginForm() {
    console.log(this.login.value)
    this.http.get('http://localhost:3000/signup').subscribe((res: any) => {
      const user = res.find((a: any) => {
        return a.email === this.login.value.email && a.password === this.login.value.password
      });
      if (user) {
        if (user.role == 'Tenant') {
          Swal.fire('Success', 'You logged in succesfully!', 'success')
            .then(() => {
              this.login.reset();
              this.submitEvent.emit(res);
              this.router.navigateByUrl('/tenant')
              // this.router.navigateByUrl('main')

            })
        }
        else {
          Swal.fire('Success', 'You logged in succesfully!', 'success')
            .then(() => {
              this.login.reset();
              this.submitEvent.emit(res);
              this.router.navigateByUrl('/landlord')
              // this.router.navigateByUrl('main')
            })
        }

      }
      else {
        Swal.fire('Sorry', 'User not found!', 'error')
      }
    })

  }

}
