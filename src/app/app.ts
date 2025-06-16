import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizHost } from './features/quiz-host/quiz-host';
import { Userboard } from './features/userboard/userboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuizHost, Userboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor() { }

  protected title: string = 'angular-libs';
  data: string[] = [];
}
