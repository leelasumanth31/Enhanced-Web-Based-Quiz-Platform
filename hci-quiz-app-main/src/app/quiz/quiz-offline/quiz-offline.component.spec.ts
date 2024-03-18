import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOfflineComponent } from './quiz-offline.component';

describe('QuizOfflineComponent', () => {
  let component: QuizOfflineComponent;
  let fixture: ComponentFixture<QuizOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizOfflineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
