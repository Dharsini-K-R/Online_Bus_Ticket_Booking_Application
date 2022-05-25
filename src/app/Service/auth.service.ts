import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail = null;
  constructor(private http: HttpClient) {}

  UserLogin(email: string, password: string) {
    return this.http
      .post<{ token: string; user: object }>(
        'http://localhost:2002/api/login',
        {
          email,
          password,
        }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getUserEmail() {
    return this.userEmail;
  }

  UserRegister(email: string, password: string, name: string) {
    return this.http
      .post('http://localhost:2002/api/register', {
        email,
        password,
        name,
      })
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        })
      );
  }

  userLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  isAdmin() {
    const user = this.getUser();
    if (user) {
      return user.role === 1 ? true : false;
    }
    return false;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  bookTicket(
    numberOfSeats: number,
    price: number,
    bus: string,
    user: string,
    date: Date
  ) {
    return this.http
      .post(
        `http://localhost:2002/api/user/${user}/ticket/book`,
        {
          numberOfSeats,
          price,
          bus,
          user,
          date,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getUserTickets() {
    const userid = this.getUser()._id;
    return this.http
      .get(`http://localhost:2002/api/user/${userid}/ticket/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getAllTickets() {
    const userid = this.getUser()._id;
    return this.http
      .get(`http://localhost:2002/api/user/${userid}/bookings/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  deleteTicket(id: string) {
    const userid = this.getUser()._id;
    return this.http
      .delete(`http://localhost:2002/api/user/${userid}/ticket/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
