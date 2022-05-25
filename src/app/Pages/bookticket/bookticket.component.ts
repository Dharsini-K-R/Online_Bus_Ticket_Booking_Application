import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { BusService } from 'src/app/Service/bus.service';
import { LocationService } from 'src/app/Service/location.service';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css'],
})
export class BookticketComponent implements OnInit {
  bus: any;
  numberOfSeat: number = 0;
  constructor(
    private parma: ActivatedRoute,
    private busSer: BusService,
    private auth: AuthService,
    private route: Router,
    private toaster: ToastrService,
    private locationSer: LocationService
  ) {}

  ngOnInit(): void {
    this.parma.params.subscribe((params) => {
      console.log(params);
      const { busid } = params;
      this.busSer
        .getBusById(busid)
        .pipe(first())
        .subscribe((res) => {
          this.bus = res;
          this.locationSer.getLocation(this.bus.boarding).subscribe((res) => {
            this.bus.boarding = res.name;
          });
          this.locationSer
            .getLocation(this.bus.destination)
            .subscribe((res) => {
              this.bus.destination = res.name;
            });
        });
    });
  }

  bookTicket() {
    this.auth
      .bookTicket(
        this.numberOfSeat,
        this.numberOfSeat * this.bus.price,
        this.bus._id,
        this.auth.getUser()._id,
        this.bus.date
      )
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        this.toaster.success('Booking Successful');
        this.route.navigate(['profile']);
      });
  }
}
