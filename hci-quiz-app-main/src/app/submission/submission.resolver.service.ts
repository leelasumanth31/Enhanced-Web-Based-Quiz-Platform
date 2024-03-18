import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map, catchError, delay } from 'rxjs/operators';
import { QuestionService } from 'src/app/core/question.service';
import { SubmissionResolved } from './submission-data';

@Injectable({
  providedIn: 'root'
})
export class SubmissionResolver implements Resolve<SubmissionResolved> {
  constructor(private questionServce: QuestionService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SubmissionResolved> {
    return this.questionServce.getQuizResult('kw').pipe(delay(1000),
      map(quizResult => ({ quizResult })),
      catchError(error => {
        return of({
          quizResult: {QuizId: 0,
            QuestionsTotal: 0,
            QuestionsCorrect: 0,
            Questions: [],
            TimeTotal:0
          },
          error: `Retrieval error: ${error.message}`
        });
      })
    );
  }
}
