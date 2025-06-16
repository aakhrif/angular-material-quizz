import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { QuizSelector } from './quiz-selector/quiz-selector';
import { Quiz, QuizzesByTopic, Topic } from '../../shared/models/interfaces';
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

  constructor(private sessionStateService: SessionStateService) {
    this.sessionStateService.getTopics().subscribe(data => this.topics.set(data));
    this.sessionStateService.getQuizzes().subscribe(data => this.quizzes.set(data));
    this.selectedTopic = this.sessionStateService.selectedTopic;
    console.log('thisQuizzes ', this.quizzes())
  }

  onTopicSelected(topicId: string) {
    console.log('topicId ', topicId)
    this.sessionStateService.selectedTopic.set(topicId);
  }

  onLevelSelected(level: string) {
    console.log('level ', level);
    this.sessionStateService.selectedLevel.set(level);
  }
}