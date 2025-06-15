import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { QuizSelector } from './quiz-selector/quiz-selector';
import { Quiz, QuizzesByTopic, Topic } from '../../shared/models/interfaces';
import { QuizHostService } from './quiz-host.service';
import { FormsModule } from '@angular/forms';
import { Quizzes } from './quizzes/quizzes';

@Component({
  selector: 'app-quiz-host',
  imports: [CommonModule, FormsModule, QuizSelector, Quizzes],
  templateUrl: './quiz-host.html',
  styleUrl: './quiz-host.scss'
})
export class QuizHost {
  readonly currentIndex = signal(0);
  readonly selectedTopic = signal('aws');
  readonly quizzes = signal<QuizzesByTopic>({});
  readonly topics = signal<Topic[]>([]);

  readonly filteredQuizzes: Signal<Quiz[]> = computed(() => {
    const quizzesByTopic = this.quizzes();
    const topicId = this.selectedTopic();
    return quizzesByTopic[topicId] ?? []
  });

  constructor(private quizHostService: QuizHostService) {
    this.quizHostService.getTopics().subscribe(data => this.topics.set(data));
    this.quizHostService.getQuizzes().subscribe(data => this.quizzes.set(data));
  }

  onTopicSelected(topicId: string) {
    this.selectedTopic.set(topicId);
  }
}