import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import{User} from '../models/user'
@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss'],
  providers: [EventService],
})
export class ArtistPageComponent implements OnInit {
  id!: string;
  constructor(
    private readonly service: EventService,
    private readonly _router: ActivatedRoute,
    private _rout: Router,
    private readonly userService: UserService
  ) {}
  public Artist!:User;
  public Events!: Event[];
  ngOnInit(): void {
    this.id = this._router.snapshot.paramMap.get('id')!;
    console.log();
    this.service.getUpcomingEvents().subscribe((events) => {
      console.log(this.id);

      this.userService.GetUser(this.id).subscribe((user) => {
        console.log(user);
        this.Artist=user;
        this.Events = events.filter((event) => 
          event.artist_name === user.user_name
        );
        console.log(this.Events);

      });
    });
  }

  goToAddEvent(){
    this._rout.navigate(['add-event']);
  }
}
