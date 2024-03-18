import { Question, QuizResult } from "src/app/core/question";


export interface SubmissionResolved {
  quizResult: QuizResult;
  error?: any;
}
