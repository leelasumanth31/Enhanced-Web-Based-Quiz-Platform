import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Answer } from 'src/app/core/question';
import { QuestionService } from 'src/app/core/question.service';
import { StatusService } from 'src/app/shared/status.service';

@Component({
  selector: 'app-quiz-offline',
  templateUrl: './quiz-offline.component.html',
  styleUrls: ['./quiz-offline.component.css']
})
export class QuizOfflineComponent implements OnInit {
status: boolean = false
status2: boolean = false
countDown: Subscription | undefined;
counter = 3;
  constructor(
    private statusService: StatusService,
    private router: Router,
    private questionService: QuestionService,
    ) { }

    ngOnDestroy(): void {
      this.countDown?.unsubscribe();
    }

  ngOnInit(): void {
    this.countDown = timer(0, 1000).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      }

      if (!this.status) {
      this.status = this.statusService.isOnline()
      }
      
      if (this.status && !this.status2) {
        this.status2 = true;
        this.questionService.putAnswer(this.questionService.getSelectedAnswers()).subscribe(() => {
        this.router.navigate(['/submission']);
      });
     } else if (this.counter === 0) {
        this.counter = 3;
      }

    })
  }
}
