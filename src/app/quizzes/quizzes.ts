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
  currentQuizz: Quiz = {choices: [], id: 0, question: "", selectMultiple: false};
  currentQuizzIndex: number = 0;
  choice: Choice = {id: "", isCorrect: false, text: ""};
  answerChecked = false;
  isLastAnswerCorrect = false;

  constructor(private quizzesService: QuizzesService) {}

  ngOnInit(): void {
    this.quizzesService.getQuizzes().subscribe(data => {
      this.quizzes = data;
      this.currentQuizz =  this.quizzes[this.currentQuizzIndex];
    });
  }

  submitAnswer(): void {
    console.log('question ' + this.currentQuizz?.question);
    console.log('choice text ' + this.choice.text);
    console.log('selectedValue ' + this.selectedValue);
    console.dir('currentQuizz ' + JSON.stringify(this.currentQuizz));
    console.dir('choice ', this.choice);

    if (!this.currentQuizz?.selectMultiple) {
      const selectedAnswer = this.currentQuizz?.choices.find((choice) => choice.id === this.selectedValue);
      this.answerChecked = true;
      if (selectedAnswer?.isCorrect) {
        this.isLastAnswerCorrect = true;
      } else {
        this.isLastAnswerCorrect = false;
      }
    }
  }

  goNext(): void {
    this.currentQuizzIndex += 1;
    if (this.currentQuizzIndex < this.quizzes.length) {
      this.currentQuizz = this.quizzes[this.currentQuizzIndex];
    }
  }

  onSelectionChange() {
    this.isLastAnswerCorrect = false;
    this.answerChecked = false;
  }
}
