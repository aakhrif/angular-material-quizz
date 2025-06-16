import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { QuizSelector } from './quiz-selector/quiz-selector';
import { Quiz, QuizLevel, Topic } from '../../shared/models/interfaces';
import { FormsModule } from '@angular/forms';
import { Quizzes } from './quizzes/quizzes';
import { SessionStateService } from '../../shared/services/session-state-service';

@Component({
  selector: 'app-quiz-host',
  imports: [CommonModule, FormsModule, QuizSelector, Quizzes],
  templateUrl: './quiz-host.html',
  styleUrl: './quiz-host.scss'
})
export class QuizHost {
  readonly selectedTopic: Signal<string>;
  readonly filteredQuizzes: Signal<Quiz[]>;
  readonly topics: Signal<Topic[]>;

  constructor(private sessionStateService: SessionStateService) {
    this.selectedTopic = this.sessionStateService.selectedTopic;
    this.filteredQuizzes = this.sessionStateService.getFilteredQuizzes();
    this.topics = this.sessionStateService.topics;
  }

  onTopicSelected(topicId: string) {
    this.sessionStateService.selectedTopic.set(topicId);
  }

  onLevelSelected(level: string) {
    this.sessionStateService.selectedLevel.set(level as QuizLevel);
  }
}