import { Question, QuizQuestions } from "src/app/core/question";


export interface QuestionsResolved {
  questions: QuizQuestions;
  error?: any;
}
