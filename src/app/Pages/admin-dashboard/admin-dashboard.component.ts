import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/Service/auth.service';
import { BusService } from 'src/app/Service/bus.service';
import { LocationService } from 'src/app/Service/location.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  user: any;
  buses: any;
  locations: any;

  tickets: any;

  locationName: string = '';

  busName: string = '';
  busPrice: number = 0;
  busDes: string = '';
  busBor: string = '';
  busSeat: number = 0;
  busAvailable: number = 0;
  busDate: Date = new Date();
  busTime: string = '';

  constructor(
    private auth: AuthService,
    private location: LocationService,
    private bus: BusService,
    private toaster: ToastrService
  ) {
    this.user = this.auth.getUser();
    this.location
      .getAllLocation()
      .pipe(first())
      .subscribe((data) => {
        this.locations = data;
      });

    this.bus
      .getAllbuses()
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        this.buses = data;
        this.buses.map((item: any) => {
          this.location
            .getLocation(item.boarding)
            .pipe(first())
            .subscribe((res) => {
              item.boarding = res.name;
            });
          this.location
            .getLocation(item.destination)
            .pipe(first())
            .subscribe((res) => {
              item.destination = res.name;
            });
        });
      });

    this.auth
      .getAllTickets()
      .pipe(first())
      .subscribe((data) => {
        this.tickets = data;
        this.tickets.map((ticket: any) => {
          this.bus
            .getBusById(ticket.bus)
            .pipe(first())
            .subscribe((res) => {
              ticket.bus = res;
              this.location
                .getLocation(ticket.bus.boarding)
                .pipe(first())
                .subscribe((res) => {
                  ticket.bus.boarding = res.name;
                });
              this.location
                .getLocation(ticket.bus.destination)
                .pipe(first())
                .subscribe((res) => {
                  ticket.bus.destination = res.name;
                });
            });
        });
      });
  }

  addLocation() {
    console.log(this.locationName);
    this.location
      .addLocation(this.locationName, this.user._id)
      .subscribe((data) => {
        this.locations.push(data);
        this.toaster.success('Location Added');
      });
  }

  deleteLocation(id: string) {
    this.location
      .deleteLocation(id, this.user._id)
      .pipe(first())
      .subscribe((data) => {
        this.locations = this.locations.filter((item: any) => item._id !== id);
        this.toaster.success('Location Deleted');
      });
  }

  deleteBus(id: string) {
    this.bus
      .deleteBus(id, this.user._id)
      .pipe(first())
      .subscribe((data) => {
        this.buses = this.buses.filter((item: any) => item._id !== id);
        this.toaster.success('Bus Deleted');
      });
  }

  addBus() {
    this.bus
      .addBus(
        this.busName,
        this.busPrice,
        this.busDes,
        this.busBor,
        this.busSeat,
        this.busAvailable,
        this.busDate,
        this.busTime,
        this.user._id
      )
      .pipe(first())
      .subscribe((data) => {
        this.buses.push(data);
        this.toaster.success('Bus Added');
      });
  }

  deleteTicket(id: string) {
    this.auth
      .deleteTicket(id)
      .pipe(first())
      .subscribe((data) => {
        this.tickets = this.tickets.filter((item: any) => item._id !== id);
        this.toaster.success('Ticket Deleted');
      });
  }

  ngOnInit(): void {}
}
