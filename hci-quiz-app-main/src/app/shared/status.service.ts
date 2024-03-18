import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, merge, Observable, of, Subscription, timer, interval } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
  })
  export class StatusService {
    status: boolean = true;
    status2: boolean = true;
    subscription$: Subscription = Subscription.EMPTY;

    constructor(
        private notificationService: NotificationService,
        private router: Router,
    ) {

    }
  
  isOnline(): boolean {
    return navigator.onLine && this.status;
  }

  getSumulatedConnectionStatus() {
    return this.status;
  }

  simulateConnection() {
    return interval(30000)
}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getStatus() {
    this.status = navigator.onLine
    this.subscription$ = this.simulateConnection()
      .subscribe(() => {
        this.status2 = !this.status2
        if (this.router.url === '/quiz/offline') {
          this.status = this.status2;
          return;
        }
        
        if (this.status2 != this.status) {
          if (this.status2) {
            this.notificationService.openSnackBar('Internet connection has been restored.')
          } else if (this.router.url === '/quiz/started') {
            this.notificationService.openSnackBar('Internet connection was lost. Please continue until time expires.')
          } else {
            this.notificationService.openSnackBar('Internet connection was lost.')
          }
        }
        this.status = this.status2;
      });
  }

}