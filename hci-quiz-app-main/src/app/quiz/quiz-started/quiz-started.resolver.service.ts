import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { QuestionsResolved } from './question-data';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map, catchError, delay } from 'rxjs/operators';
import { QuestionService } from 'src/app/core/question.service';
import { PostQuestion } from 'src/app/core/question';

@Injectable({
  providedIn: 'root'
})
export class QuizStartedResolver implements Resolve<QuestionsResolved> {
  constructor(private questionServce: QuestionService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<QuestionsResolved> {
    var userName: string = String(localStorage.getItem('username'));
    var postQuestion: PostQuestion = {UserName: userName}
    return this.questionServce.postQuestion(postQuestion).pipe(delay(500),
      map(questions => ({ questions })), 
      catchError(error => {
        return of({
          questions: {Questions:[], QuizId: 0},
          error: `Retrieval error: ${error.message}`
        });
      })
    );
  }
}
