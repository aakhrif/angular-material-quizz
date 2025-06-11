import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { QuizzesService } from './quizzes.service';
import { Choice, Quiz } from './interfaces';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-quizzes',
  imports: [MatRadioModule, MatFormFieldModule, FormsModule, CommonModule, MatCheckbox, MatButtonModule, MatIcon],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss'
})
export class Quizzes {
  selectedValue: string = "";
  quizzes: Quiz[] = [];
  currentQuizz: Quiz = { choices: [], id: 0, question: "", selectMultiple: false };
  currentQuizzIndex: number = 0;
  choice: Choice = { id: "", isCorrect: false, text: "" };
  answerChecked = false;
  isLastAnswerCorrect = false;
  selectedValues: string[] = [];

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
        find((choice) => choice.id === this.selectedValue);
      
      if (selectedAnswer?.isCorrect) {
        this.isLastAnswerCorrect = true;
      } else {
        this.isLastAnswerCorrect = false;
      }
    } else if (this.currentQuizz?.selectMultiple) {
      const correctAnswers = this.currentQuizz?.choices
        .filter(choice => choice.isCorrect)
        .map(choice => choice.id);
      if (correctAnswers.length === this.selectedValues.length 
        && correctAnswers.every((val: string) => this.selectedValues.includes(val))) {
          this.isLastAnswerCorrect = true;
        } else {
          this.isLastAnswerCorrect = false;
        }
    }
  }

  goNext(): void {
    this.selectedValues = [];
    this.currentQuizzIndex += 1;
    if (this.currentQuizzIndex < this.quizzes.length) {
      this.currentQuizz = this.quizzes[this.currentQuizzIndex];
    }
    this.answerChecked = false;
    this.isLastAnswerCorrect = false;
  }

  onSelectionChange() {
    this.isLastAnswerCorrect = false;
    this.answerChecked = false;
  }

  onCheckboxChange(event: any, choiceId: string) {
    this.isLastAnswerCorrect = false;
    this.answerChecked = false;
    if (event.checked) {
      this.selectedValues.push(choiceId);
    } else {
      this.selectedValues = this.selectedValues.filter(id => id !== choiceId);
    }
  }
}
