import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getAllLocation() {
    return this.http.get<any>('http://localhost:2002/api/location/all').pipe(
      map((res) => {
        return res;
      })
    );
  }

  addLocation(name: string, userID: 'string') {
    console.log(name);
    return this.http
      .post<any>(
        `http://localhost:2002/api/user/${userID}/location/new`,
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
      .delete<any>(`http://localhost:2002/api/user/${user}/location/${id}`, {
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
      .get<{ name: string }>(`http://localhost:2002/api/location/${id}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
