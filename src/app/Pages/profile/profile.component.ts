import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { BusService } from 'src/app/Service/bus.service';
import { LocationService } from 'src/app/Service/location.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  tickets: any;
  user: any;
  constructor(
    private auth: AuthService,
    private busService: BusService,
    private locationSer: LocationService,
    private toaster: ToastrService
  ) {
    this.user = auth.getUser();

    this.auth
      .getUserTickets()
      .pipe(first())
      .subscribe((res) => {
        this.tickets = res;
        this.tickets.map((ticket: any) => {
          this.busService
            .getBusById(ticket.bus)
            .pipe(first())
            .subscribe((res) => {
              ticket.bus = res;
              this.locationSer
                .getLocation(ticket.bus.boarding)
                .pipe(first())
                .subscribe((res) => {
                  ticket.bus.boarding = res.name;
                });
              this.locationSer
                .getLocation(ticket.bus.destination)
                .pipe(first())
                .subscribe((res) => {
                  ticket.bus.destination = res.name;
                });
            });
        });
      });
  }

  cancelTicket(ticket: string) {
    this.auth
      .deleteTicket(ticket)
      .pipe(first())
      .subscribe((res) => {
        this.tickets = this.tickets.filter((item: any) => item._id !== ticket);
        this.toaster.success('Cancel Successful');
      });
  }

  ngOnInit(): void {}
}
