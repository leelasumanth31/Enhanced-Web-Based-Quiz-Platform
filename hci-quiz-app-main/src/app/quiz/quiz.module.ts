import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormatTimePipe, QuizStartedComponent } from './quiz-started/quiz-started.component';
import { QuizOfflineComponent } from './quiz-offline/quiz-offline.component';
import { QuizRoutingModule } from './quiz-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QuizRoutingModule
  ],
  declarations: [
    QuizStartedComponent,
    QuizOfflineComponent,
    FormatTimePipe
  ],
  providers: []
})
export class QuizModule {}
