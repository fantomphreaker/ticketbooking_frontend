import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router'
import { EventService } from './../services/event.service';
import {Event} from '../models/event';
import{FormControl} from '@angular/forms';
import { SharedService } from './../services/shared.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [EventService]
})
export class EventComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private service :EventService,
    private _router: Router,
    private _shared:SharedService    ) { }
  public id! : number;
  public Event!: Event[];
  ticket=new FormControl();
  ngOnInit(): void {
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getEvent(this.id).subscribe(data=>{
      this.Event = data;
      console.log(data);
    });
    this._shared.setEventId(this.id);
  }
  gotopayment(price:number){
    console.log('payment/'+price+'/'+this.ticket.value);
    this._router.navigate(['payment/'+price+'/'+this.ticket.value]);
  }


}
