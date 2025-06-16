import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizLevel, Topic } from '../../../shared/models/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { TechIcon } from '../../../shared/ui/tech-icon/tech-icon';

@Component({
  selector: 'app-quiz-selector',
  imports: [CommonModule, MatButtonModule, TechIcon],
  templateUrl: './quiz-selector.html',
  styleUrl: './quiz-selector.scss'
})

export class QuizSelector {
  @Input() levels: QuizLevel[] = [];
  @Input() topics: Topic[] = [];
  @Output() selectTopic = new EventEmitter<string>();
  @Output() selectLevel = new EventEmitter<string>();
}
