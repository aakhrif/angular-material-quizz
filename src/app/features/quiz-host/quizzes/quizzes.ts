import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Quiz } from '../../../shared/models/interfaces';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
  @Input() filteredQuizzes: Quiz[] = [];

  state = signal<{
    filteredQuizzes: Quiz[],
    currentIndex: number,
    selectedSingleChoice: string,
    selectedMultiChoices: string[],
    answerChecked: boolean,
    isLastAnswerCorrect: boolean
  }>({
    filteredQuizzes: [] as Quiz[],
    currentIndex: 0,
    selectedSingleChoice: '',
    selectedMultiChoices: [] as string[],
    answerChecked: false,
    isLastAnswerCorrect: false
  });

  currentQuiz = computed(() => {
    const s = this.state();
    return s.filteredQuizzes[s.currentIndex];
  });

  readonly selectedSingleChoice = computed(() => this.state().selectedSingleChoice);
  readonly selectedMultiChoices = computed(() => this.state().selectedMultiChoices);
  readonly answerChecked = computed(() => this.state().answerChecked);
  readonly isLastAnswerCorrect = computed(() => this.state().isLastAnswerCorrect);
  readonly quizzes = computed(() => this.state().filteredQuizzes);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filteredQuizzes']) {
      this.state.update(s => ({
        ...s,
        filteredQuizzes: this.filteredQuizzes,
        currentIndex: 0,
        selectedSingleChoice: '',
        selectedMultiChoices: [],
        answerChecked: false,
        isLastAnswerCorrect: false
      }));
    }
  }

  submitAnswer(): void {
    const quiz = this.currentQuiz();
    const { selectedSingleChoice, selectedMultiChoices } = this.state();

    let isCorrect = false;

    if (!quiz.selectMultiple) {
      const selected = quiz.choices.find(c => c.id === selectedSingleChoice);
      isCorrect = !!selected?.isCorrect;
    } else {
      const correctIds = quiz.choices.filter(c => c.isCorrect).map(c => c.id);
      isCorrect = (
        correctIds.length === selectedMultiChoices.length &&
        correctIds.every(id => selectedMultiChoices.includes(id))
      );
    }

    this.state.update(s => ({
      ...s,
      answerChecked: true,
      isLastAnswerCorrect: isCorrect
    }));
  }

  goNext(): void {
    this.state.update(s => {
      const nextIndex = s.currentIndex + 1;
      const isEnd = nextIndex >= s.filteredQuizzes.length;

      return {
        ...s,
        currentIndex: isEnd ? s.currentIndex : nextIndex,
        selectedSingleChoice: '',
        selectedMultiChoices: [],
        answerChecked: false,
        isLastAnswerCorrect: false
      };
    });
  }

  onSelectionChange(event: MatRadioChange): void {
    this.state.update(s => ({
      ...s,
      selectedSingleChoice: event.value,
      answerChecked: false,
      isLastAnswerCorrect: false
    }));
  }

  onCheckboxChange(event: MatCheckboxChange, choiceId: string): void {
    this.state.update(s => {
      const selected = new Set(s.selectedMultiChoices);
      event.checked ? selected.add(choiceId) : selected.delete(choiceId);

      return {
        ...s,
        selectedMultiChoices: Array.from(selected),
        answerChecked: false,
        isLastAnswerCorrect: false
      };
    });
  }
}
