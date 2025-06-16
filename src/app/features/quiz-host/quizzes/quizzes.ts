import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Quiz, QuizzesByTopic } from '../../../shared/models/interfaces';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SessionStateService } from '../../../shared/services/session-state-service';

@Component({
  selector: 'app-quizzes',
  imports: [MatRadioModule, MatFormFieldModule, FormsModule, CommonModule, MatCheckbox, MatButtonModule, MatIcon],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss'
})
/**
Central, reactive state in signal<...>()

A computed() property for the current quiz

The class is clear, minimal, and testable

All UI changes automatically follow the state
*/
export class Quizzes {
  readonly currentQuiz: Signal<Quiz>;
  readonly selectedSingleChoice: Signal<string>;
  readonly selectedMultiChoices: Signal<string[]>;
  readonly answerChecked: Signal<boolean>;
  readonly isLastAnswerCorrect: Signal<boolean>;
  readonly quizzes: Signal<QuizzesByTopic>;

  constructor(private sessionStateService: SessionStateService) {
    this.currentQuiz = this.sessionStateService.currentQuiz;
    this.selectedSingleChoice = this.sessionStateService.selectedSingleChoice;
    this.selectedMultiChoices = this.sessionStateService.selectedMultiChoices;
    this.answerChecked = this.sessionStateService.answerChecked;
    this.isLastAnswerCorrect = this.sessionStateService.isLastAnswerCorrect;
    this.quizzes = this.sessionStateService.quizzes;
  }

  submitAnswer(): void {
    this.sessionStateService.submitAnswer();
  }

  goNext(): void {
    this.sessionStateService.goNext();
  }

  onSelectionChange(event: MatRadioChange): void {
    this.sessionStateService.updateSingleChoice(event.value);
  }

  onCheckboxChange(event: MatCheckboxChange, choiceId: string): void {
    this.sessionStateService.toggleMultiChoice(choiceId, event.checked);
  }
}