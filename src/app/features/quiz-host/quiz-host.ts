import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { QuizSelector } from './quiz-selector/quiz-selector';
import { Quiz, QuizLevel, Topic } from '../../shared/models/interfaces';
import { FormsModule } from '@angular/forms';
import { Quizzes } from './quizzes/quizzes';
import { QuizzesStateService } from '../../shared/services/quizzes-state/quizzes-state-service';

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
  readonly levels: Signal<QuizLevel[]>;

  constructor(private quizzesStateService: QuizzesStateService) {
    this.selectedTopic = this.quizzesStateService.selectedTopic;
    this.filteredQuizzes = this.quizzesStateService.getFilteredQuizzes();
    this.topics = this.quizzesStateService.topics;
    this.levels = this.quizzesStateService.levels;
  }

  onTopicSelected(topicId: string) {
    this.quizzesStateService.selectedTopic.set(topicId);
  }

  onLevelSelected(level: string) {
    this.quizzesStateService.selectedLevel.set(level as QuizLevel);
  }
}