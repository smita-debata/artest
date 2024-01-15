import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<any>();
  hide = true;
  Signup!: FormGroup;
  roles = ['Landlord', 'Tenant',];
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {

    this.Signup = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      rolebase: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  signup() {
    this.http.post("http://localhost:3000/signup", this.Signup.value).subscribe((res: any) => {
      Swal.fire('Success', 'You logged in succesfully!', 'success')
        .then(() => {
          this.Signup.reset();
          this.submitEvent.emit();
          this.router.navigateByUrl('dash')
        })
    })

  }

}
