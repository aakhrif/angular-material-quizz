import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from '../shared/models/interfaces';

@Component({
  selector: 'app-quiz-selector',
  imports: [CommonModule],
  templateUrl: './quiz-selector.html',
  styleUrl: './quiz-selector.scss'
})

export class QuizSelector {
  @Input() topics: Topic[] = [];
  @Output() selectTopic = new EventEmitter<string>();
}
