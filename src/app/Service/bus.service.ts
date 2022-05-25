import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})

export class BusService {
  url: string = "http://44.204.150.130:2002/"
  constructor(private http: HttpClient) { }

  getAllbuses() {
    return this.http.get(this.url + 'api/buses').pipe(
      map((res) => {
        return res;
      })
    );
  }

  getBusById(id: string) {
    return this.http.get(this.url + `api/bus/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getSearchBus(des: string, bor: string, date: Date) {
    return this.http
      .get<any>(this.url + `api/bus/${bor}/${des}/all`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteBus(id: string, userId: string) {
    return this.http
      .delete<any>(this.url + `api/user/${userId}/bus/${id}`, {
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

  addBus(
    busName: string,
    busPrice: number,
    busDes: string,
    busBor: string,
    busSeat: number,
    busAvailable: number,
    busDate: Date,
    busTime: string,
    userId: string
  ) {
    return this.http
      .post<any>(
        this.url + `api/user/${userId}/bus/new`,
        {
          name: busName,
          price: busPrice,
          destination: busDes,
          boarding: busBor,
          seats: busSeat,
          availableSeats: busAvailable,
          date: busDate,
          time: busTime,
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
}
