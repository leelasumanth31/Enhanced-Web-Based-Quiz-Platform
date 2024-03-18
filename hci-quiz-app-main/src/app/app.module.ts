import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemWebApiService } from './core/in-mem-web-api.service';
import { QuizComponent } from './quiz/quiz.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CoreModule } from './core/core.module';
import { ErrorComponent } from './error/error.component';
import { FormatTimePipe, SubmissionComponent } from './submission/submission.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ErrorComponent,
    SubmissionComponent,
    FormatTimePipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    /* HttpClientInMemoryWebApiModule.forRoot(InMemWebApiService, {
      delay: 1000
    }), */
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
