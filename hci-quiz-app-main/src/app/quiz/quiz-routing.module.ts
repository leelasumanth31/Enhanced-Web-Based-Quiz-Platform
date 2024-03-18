import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizStartedComponent } from './quiz-started/quiz-started.component';
import { QuizStartedGuard } from './quiz-started/quiz-started.guard';
import { QuizStartedResolver } from './quiz-started/quiz-started.resolver.service';
import { QuizOfflineComponent } from './quiz-offline/quiz-offline.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
  {
    path: 'started',
    component: QuizStartedComponent, 
    canActivate: [QuizStartedGuard], 
    resolve: { questions: QuizStartedResolver }
  },
  {
    path: 'offline',
    component: QuizOfflineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
