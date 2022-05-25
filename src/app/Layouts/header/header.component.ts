import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  email = null;
  role = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toaster: ToastrService
  ) {
    if (this.auth.isLoggedIn()) {
      this.email = this.auth.getUser().email;
      if (this.auth.getUser().role === 1) {
        this.role = true;
      }
    } else {
      this.email = null;
    }
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.auth.isLoggedIn()) {
      this.email = this.auth.getUser().email;
      if (this.auth.getUser().role === 1) {
        this.role = true;
      }
    } else {
      this.email = null;
    }
  }

  LogoutClick() {
    this.auth.userLogout();
    this.toaster.success('Logout Successful');
  }
}
