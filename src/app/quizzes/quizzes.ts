import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { QuizzesService } from './quizzes.service';
import { Choice, Quiz } from './interfaces';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-quizzes',
  imports: [MatRadioModule, MatFormFieldModule, FormsModule, CommonModule, MatCheckbox],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss'
})
export class Quizzes {
  selectedValue: string = '';
  quizzes: Quiz[] = [];
  currentQuizzIndex: number = 0;
  choice: Choice = {id: "", isCorrect: false, text: ""};

  constructor(private quizzesService: QuizzesService) {}

  ngOnInit(): void {
    this.quizzesService.getQuizzes().subscribe(data => {
      this.quizzes = data;
    });
  }

  get currentQuizz(): Quiz | null {
    return this.quizzes[this.currentQuizzIndex] ?? null;
  }

  submitAnswer() {
    console.log('debug ' + this.currentQuizz?.question);
    console.log('debug ' + this.choice.text);
    console.log('debug ' + this.selectedValue);
  }
}
