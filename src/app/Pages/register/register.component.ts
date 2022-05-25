import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public name = '';
  public email = '';
  public password = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.auth
      .UserRegister(this.email, this.password, this.name)
      .pipe(first())
      .subscribe((data) => {
        if (data) {
          this.toastr.success('Registration Successful');
          this.router.navigate(['/login']);
        } else {
          console.log('Email', this.email);
          console.log('Password', this.password);
          console.log('Name', this.name);

          this.toastr.error('Registration Failed');
        }
      });
  }
}
