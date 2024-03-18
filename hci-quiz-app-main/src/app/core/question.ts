export interface Question {
    Question: string;
    QuestionId: number;
    QuestionNum: number;
    Options: Options[];
  }

  export interface QuizQuestions {
    QuizId: number
    Questions: Question[]
  }

  export interface PostQuestion {
    UserName: string
  }

  export interface Options {
    OptionId: number;
    Value: string;
    Selected: boolean;
    Correct: boolean;
  }

  export interface SubmitAnswers {
    TimeTaken: number;
    Answers: Answer[];
  }
  export interface Answer {
    OptionId: number;
  }

  export interface QuizResult {
    QuizId: number;
    QuestionsTotal: number;
    QuestionsCorrect: number;
    Questions: Question[];
    TimeTotal: number;
  }