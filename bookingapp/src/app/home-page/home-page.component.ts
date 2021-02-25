import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { FormControl } from '@angular/forms';
/**
 * This component serves as the home page of the website.
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [EventService],
})
export class HomePageComponent implements OnInit {
  search = new FormControl('');
  selector: number = 1;
  constructor(private readonly service: EventService) {}
  public Events!: Event[];
  ngOnInit(): void {
    this.service.getUpcomingEvents().subscribe((response) => {
      this.Events = response;
      console.log(response);
    });
  }
  onClickSearch(): void {
    if (this.search.value !== '') {
      if (this.selector == 1) {
        this.service.getUpcomingEvents().subscribe((events) => {
          this.Events = events.filter(
            (event) => event.artist_name === this.search.value
          );
        });
      }
      if (this.selector == 2) {
        this.service.getUpcomingEvents().subscribe((events) => {
          this.Events = events.filter(
            (event) => event.venue_name === this.search.value
          );
        });
      }
      if (this.selector == 3) {
        this.service.getUpcomingEvents().subscribe((events) => {
          this.Events = events.filter(
            (event) => event.venue_name === this.search.value
          );
        });
      }
      if (this.selector == 4) {
        this.service.getUpcomingEvents().subscribe((events) => {
          this.Events = events.filter(
            (event) => event.event_name === this.search.value
          );
        });
      }
    }else{
      this.service.getUpcomingEvents().subscribe((response) => {
        this.Events = response;
        console.log(response);
      });
    }
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
