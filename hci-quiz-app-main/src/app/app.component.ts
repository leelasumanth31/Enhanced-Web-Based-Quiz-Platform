import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import { User } from './core/user';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from '@angular/router';
import { NotificationService } from './shared/notification.service';
import { UserService } from './core/user.service';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  loaded: boolean = false;
  title = 'SLAAK Quiz';
  user!: User;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService,
    private statusService: StatusService
  ) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      var doc = document.querySelector('mat-sidenav-content');
      if (doc != null) {
        doc.scrollTop = 0;      
      }
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  ngOnInit() {
    if(localStorage.getItem('username') === null) {
      localStorage.setItem('username', crypto.randomUUID())
    } 

    this.loaded = true;
    this.loading = true;

    this.statusService.getStatus();
  }
}
