import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './Layouts/header/header.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './Service/auth.service';
import { BusService } from './Service/bus.service';
import { AuthGuard } from './Guard/auth.guard';
import { LocationService } from './Service/location.service';
import { ProfileComponent } from './Pages/profile/profile.component';
import { BookticketComponent } from './Pages/bookticket/bookticket.component';
import { ShowbusComponent } from './Pages/showbus/showbus.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDashboardComponent,
    ProfileComponent,
    BookticketComponent,
    ShowbusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [AuthService, AuthGuard, BusService, LocationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
