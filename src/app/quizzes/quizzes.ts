import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { QuizzesService } from './quizzes.service';
import { Choice, Quiz } from './interfaces';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-quizzes',
  imports: [MatRadioModule, MatFormFieldModule, FormsModule, CommonModule, MatCheckbox, MatButtonModule, MatIcon],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss'
})
export class Quizzes {
  selectedSingleChoice: string = "";
  quizzes: Quiz[] = [];
  currentQuizz: Quiz = { choices: [], id: 0, question: "", selectMultiple: false };
  currentQuizzIndex: number = 0;
  choice!: Choice;
  answerChecked = false;
  isLastAnswerCorrect = false;
  selectedSingleChoices: string[] = [];

  constructor(private quizzesService: QuizzesService) { }

  ngOnInit(): void {
    this.quizzesService.getQuizzes().subscribe(data => {
      this.quizzes = data;
      this.currentQuizz = this.quizzes[this.currentQuizzIndex];
    });
  }

  submitAnswer(): void {
    this.answerChecked = true;
    if (!this.currentQuizz?.selectMultiple) {
      const selectedAnswer = this.currentQuizz?.choices.
        find((choice) => choice.id === this.selectedSingleChoice);
      
      if (selectedAnswer?.isCorrect) {
        this.isLastAnswerCorrect = true;
      }
    } else {
      const correctAnswers = this.currentQuizz?.choices
        .filter(choice => choice.isCorrect)
        .map(choice => choice.id);
      if (correctAnswers.length === this.selectedSingleChoices.length 
        && correctAnswers.every((val: string) => this.selectedSingleChoices.includes(val))) {
          this.isLastAnswerCorrect = true;
        }
    }
  }

  goNext(): void {
    this.selectedSingleChoices = [];
    if (this.currentQuizzIndex < this.quizzes.length) {
      this.currentQuizzIndex += 1;
      this.currentQuizz = this.quizzes[this.currentQuizzIndex];
    }
    this.answerChecked = false;
    this.isLastAnswerCorrect = false;
  }

  onSelectionChange() {
    this.isLastAnswerCorrect = false;
    this.answerChecked = false;
  }

  onCheckboxChange(event: MatCheckboxChange, choiceId: string) {
    this.isLastAnswerCorrect = false;
    this.answerChecked = false;
    if (event.checked) {
      if (!this.selectedSingleChoices.includes(choiceId)) {
        this.selectedSingleChoices.push(choiceId);
      }
    } else {
      this.selectedSingleChoices = this.selectedSingleChoices.filter(id => id !== choiceId);
    }
  }
}
