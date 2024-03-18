import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { Answer, Question, QuizResult } from '../core/question';
import { QuestionService } from '../core/question.service';
import { QuestionsResolved } from '../quiz/quiz-started/question-data';
import { StatusService } from '../shared/status.service';
import { SubmissionResolved } from './submission-data';

@Component({
  selector: 'app-welcome',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  questions: QuizResult = { Questions: [], QuizId: 0, QuestionsCorrect: 0, QuestionsTotal: 0, TimeTotal: 0};
  formGroup: FormGroup[] = [];
  formValid: boolean = false;
  SelectedAnswers: Answer[] = []

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: SubmissionResolved = data['questions'];
      this.questions = resolvedData.quizResult;

      for (let index = 0; index < this.questions.Questions.length; index++) {
        this.formGroup[index] = this.fb.group({
          ctrl: ['', Validators.required]
        });
      }
    });
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
