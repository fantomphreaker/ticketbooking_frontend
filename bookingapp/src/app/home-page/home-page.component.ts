import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
/**
 * This component serves as the home page of the website.
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [EventService]
})
export class HomePageComponent implements OnInit {

  constructor(private readonly service: EventService) { }
  public Events = [];
  ngOnInit(): void {
    this.service.getEvents().subscribe((response)=>{
    this.Events = response;
    console.log(response);
    });
  }

}
