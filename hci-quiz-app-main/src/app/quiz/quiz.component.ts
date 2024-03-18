import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(private router: Router, private statusService: StatusService, private notificationService: NotificationService) {}

  ngOnInit() {}

  startQuiz(): void {
    if (this.statusService.isOnline()) {
      if (confirm("You are about to start the quiz. Please confirm to continue.")) {
        this.router.navigate(['quiz/started'])
      }
    } else {
      this.notificationService.openSnackBar('You are currently offline. Try agian later.')
    }
  }
}
