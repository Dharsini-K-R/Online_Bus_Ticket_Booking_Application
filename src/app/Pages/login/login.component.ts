import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.email);
    console.log(this.password);
    this.auth
      .UserLogin(this.email, this.password)
      .pipe(first())
      .subscribe((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.toaster.success('Login Successful');
          this.router.navigate(['/']);
        } else {
          this.toaster.error('Login Failed');
        }
      });
  }
}
