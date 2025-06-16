import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { QuizSelector } from './quiz-selector/quiz-selector';
import { Quiz, QuizzesByTopic, Topic } from '../../shared/models/interfaces';
import { QuizHostService } from './quiz-host.service';
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
  readonly selectedTopic!: Signal<string>;
  readonly currentIndex = signal(0);
  readonly quizzes = signal<QuizzesByTopic>({});
  readonly topics = signal<Topic[]>([]);

  readonly filteredQuizzes: Signal<Quiz[]> = computed(() => {
    const quizzesByTopic = this.quizzes();
    const topicId = this.selectedTopic();
    return quizzesByTopic[topicId] ?? []
  });

  constructor(private quizHostService: QuizHostService, private sessionStateService: SessionStateService) {
    this.quizHostService.getTopics().subscribe(data => this.topics.set(data));
    this.quizHostService.getQuizzes().subscribe(data => this.quizzes.set(data));
    this.selectedTopic = this.sessionStateService.selectedTopic;
  }

  onTopicSelected(topicId: string) {
    console.log('topicId ', topicId)
    this.sessionStateService.selectedTopic.set(topicId);
  }
}