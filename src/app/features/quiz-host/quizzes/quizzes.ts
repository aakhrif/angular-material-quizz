import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Quiz, QuizzesByTopic } from '../../../shared/models/interfaces';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { QuizzesStateService } from '../../../shared/services/quizzes-state/quizzes-state-service';

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

  constructor(private quizzesStateService: QuizzesStateService) {
    this.currentQuiz = this.quizzesStateService.currentQuiz;
    this.selectedSingleChoice = this.quizzesStateService.selectedSingleChoice;
    this.selectedMultiChoices = this.quizzesStateService.selectedMultiChoices;
    this.answerChecked = this.quizzesStateService.answerChecked;
    this.isLastAnswerCorrect = this.quizzesStateService.isLastAnswerCorrect;
    this.quizzes = this.quizzesStateService.quizzes;
  }

  submitAnswer(): void {
    this.quizzesStateService.submitAnswer();
  }

  goNext(): void {
    this.quizzesStateService.goNext();
  }

  onSelectionChange(event: MatRadioChange): void {
    this.quizzesStateService.updateSingleChoice(event.value);
  }

  onCheckboxChange(event: MatCheckboxChange, choiceId: string): void {
    this.quizzesStateService.toggleMultiChoice(choiceId, event.checked);
  }

  hasQuizzes(): boolean {
    return Object.keys(this.quizzes()).length > 0;
  }
}