import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Question, Options, Answer, SubmitAnswers, QuizQuestions } from 'src/app/core/question';
import { QuestionService } from 'src/app/core/question.service';
import { StatusService } from 'src/app/shared/status.service';
import { QuestionsResolved } from './question-data';
@Component({
  selector: 'app-quiz-started',
  templateUrl: './quiz-started.component.html',
  styleUrls: ['./quiz-started.component.css']
})
export class QuizStartedComponent implements OnInit {
  hide: boolean = false;
  questions: QuizQuestions= {QuizId: 0, Questions: []};
  formGroup: FormGroup[] = [];
  formValid: boolean = false;
  SelectedAnswers: SubmitAnswers = {TimeTaken: 300, Answers: []}
  countDown: Subscription | undefined;
  counter = 300;
  status: boolean = true;
  status2: boolean = true;
  pauseQuiz = true;
  quizSubmitted: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: QuestionsResolved = data['questions'];
      this.questions = resolvedData.questions;
      this.pauseQuiz = resolvedData.questions.QuizId % 2 == 0;
      for (let index = 0; index < this.questions.Questions.length; index++) {
        this.formGroup[index] = this.fb.group({
          ctrl: ['', Validators.required]
        });
      }

      this.countDown = timer(0, 1000).subscribe(() => {
        if (this.counter > 0) {
          --this.counter;
        }

        if (this.counter === 0 && this.quizSubmitted === false) {
          this.quizSubmitted = true;
          this.submitQuiz();
        }
        this.status = this.statusService.isOnline();

        if(!this.status) {
          this.status2 = false;
        }

      });
    });
  }

  ngOnDestroy(): void {
    this.countDown?.unsubscribe();
  }

  submitQuiz() {
    if(this.isValidForm() || this.counter === 0) {
        this.routeToSubmission();
    } else {
      if (confirm('There are unanswered questions. Are you sure you want to continue?')) {
        this.routeToSubmission();
      }
    }
  }

  continueQuiz() {
    this.status2 = true;
  }

  isValidForm(): boolean {
    var valid: boolean = true;
    this.SelectedAnswers = {TimeTaken: (300 - this.counter), Answers: []}
    var opts: Answer[] = []
    for (let index = 0; index < this.formGroup.length; index++) {
      if (!this.formGroup[index].valid) {
        valid = false;
      } else {
        opts[index] = {OptionId: this.formGroup[index].value.ctrl.OptionId}
      }
    }
    this.SelectedAnswers.Answers = opts;
    console.log(this.SelectedAnswers);
    return valid;
  }

  routeToSubmission() {
    if (this.statusService.isOnline()){
      this.questionService.putAnswer(this.SelectedAnswers).subscribe(() => {
      this.router.navigate(['/submission']);
      });
    } else {
        this.questionService.setSelectedAnswers(this.SelectedAnswers);
        this.router.navigate(['/quiz/offline']);
      }
  }

  toggleTimer(): void {
    this.hide = !this.hide;
  }
  
}

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
