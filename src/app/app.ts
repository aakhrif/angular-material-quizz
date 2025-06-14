import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizHost } from './quiz-host/quiz-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuizHost],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor() { }

  protected title: string = 'angular-libs';
  data: string[] = [];
}
