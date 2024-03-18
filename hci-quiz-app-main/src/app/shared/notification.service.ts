import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: MatSnackBar)  {
  }

openSnackBar(message: string) {
this.notification.open(message, 'Dismiss', {duration: 5000, horizontalPosition: 'right', verticalPosition: 'bottom'});
}
}
