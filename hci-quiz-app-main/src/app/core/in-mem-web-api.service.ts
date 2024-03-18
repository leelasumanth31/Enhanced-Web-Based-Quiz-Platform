import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Question } from './question';
import { User } from './user';


export class InMemWebApiService implements InMemoryDbService {
  createDb() {
    const user: User[] = [
      {
        id: 1,
        userid: 'TestUser'
        }
    ];

    const questions: Question[] = [
      { 
        Question: 'This is question 1......................' , 
        QuestionId: 1,
        QuestionNum: 1,
        Options: [],
      }
  ];

    return {
      user,
      questions
    };
  }
}
