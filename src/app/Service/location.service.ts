import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  url: string = "http://44.204.150.130:2002/"
  constructor(private http: HttpClient) { }

  getAllLocation() {
    return this.http.get<any>(this.url + 'api/location/all').pipe(
      map((res) => {
        return res;
      })
    );
  }

  addLocation(name: string, userID: 'string') {
    console.log(name);
    return this.http
      .post<any>(
        this.url + `api/user/${userID}/location/new`,
        {
          name: name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteLocation(id: string, user: string) {
    return this.http
      .delete<any>(this.url + `api/user/${user}/location/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getLocation(id: string) {
    return this.http
      .get<{ name: string }>(this.url + `api/location/${id}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
