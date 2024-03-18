import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  ExtraOptions,
  NoPreloading
} from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { SubmissionComponent } from './submission/submission.component';
import { SubmissionResolver } from './submission/submission.resolver.service';

const routes: Routes = [
  { path: 'quiz',
  loadChildren: () =>
      import('./quiz/quiz.module').then(m => m.QuizModule),
    },
  { path: 'submission', component: SubmissionComponent, resolve: { questions: SubmissionResolver }},
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

const options: ExtraOptions = { preloadingStrategy: NoPreloading};

@NgModule({
  imports: [RouterModule.forRoot(routes, options)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
