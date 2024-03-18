import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { tap } from 'rxjs/operators';
import { Answer, PostQuestion, Question, QuizQuestions, QuizResult, SubmitAnswers } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8082';
  private userName: string = String(localStorage.getItem('username'));
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*') };

  private selectedAnswers: SubmitAnswers = {TimeTaken: 0, Answers: []}

  constructor(private http: HttpClient) {
  }

  postQuestion(postQuestion: PostQuestion): Observable<QuizQuestions> {
      return this.http.post<QuizQuestions>(this.baseUrl + '/api/user/postQuestion',postQuestion,this.options).pipe(tap(o => (o)));
  }

  putAnswer(answers: SubmitAnswers): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/user/'+ this.userName + '/putAnswers', answers, this.options);
  }

  getQuizResult(userid: string): Observable<QuizResult> {
    return this.http.get<QuizResult>(this.baseUrl + '/api/user/'+ this.userName + '/quizResult', this.options).pipe(tap(o => (o)));
  }

  setSelectedAnswers(selectedAnswers: SubmitAnswers) {
    this.selectedAnswers = selectedAnswers;
  }

  getSelectedAnswers() {
    return this.selectedAnswers;
  }

}
  


