import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { BusService } from 'src/app/Service/bus.service';

@Component({
  selector: 'app-showbus',
  templateUrl: './showbus.component.html',
  styleUrls: ['./showbus.component.css'],
})
export class ShowbusComponent implements OnInit {
  getprams: any;
  allbuses: any;
  constructor(
    private route: ActivatedRoute,
    private nextroute: Router,
    private buses: BusService
  ) {}

  ngOnInit(): void {
    console.log('showbus');
    //get params from url
    this.route.params.subscribe((params) => {
      this.getprams = params;
    });
    //get buses
    this.buses
      .getSearchBus(
        this.getprams.destination,
        this.getprams.boarding,
        this.getprams.date
      )
      .pipe(first())
      .subscribe((res) => {
        console.log('in showbus');
        console.log('res', res);
        this.allbuses = res.buses;
      });
  }

  onSelect(busId: string) {
    this.nextroute.navigate(['book', 'bus', busId]);
  }
}
