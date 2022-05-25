import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, pipe } from 'rxjs';
import { BusService } from 'src/app/Service/bus.service';
import { LocationService } from 'src/app/Service/location.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  location: any;
  buses: any;

  destination: string = '';
  boarding: string = '';
  date: Date = new Date();

  constructor(
    private locationservice: LocationService,
    private busService: BusService,
    private route: Router
  ) {
    this.locationservice
      .getAllLocation()
      .pipe(first())
      .subscribe((res) => {
        this.location = res;
      });
  }

  ngOnInit(): void {}

  onSearch() {
    this.route.navigate([
      '/buses',
      this.boarding,
      this.destination,
      this.date,
      'all',
    ]);
  }
}
