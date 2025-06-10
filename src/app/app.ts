import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Quizzes } from './quizzes/quizzes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Quizzes],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor() {

  }

  protected title: string = 'angular-libs';
  data: string[] = [];
}
