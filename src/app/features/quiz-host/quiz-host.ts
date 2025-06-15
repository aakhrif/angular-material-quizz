import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { QuizSelector } from './quiz-selector/quiz-selector';
import { Quiz, QuizzesByTopic, Topic } from '../../shared/models/interfaces';
import { QuizzesService } from './quizzes/quizzes.service';
import { FormsModule } from '@angular/forms';
import { Quizzes } from './quizzes/quizzes';

@Component({
  selector: 'app-quiz-host',
  imports: [CommonModule, FormsModule, QuizSelector, Quizzes],
  templateUrl: './quiz-host.html',
  styleUrl: './quiz-host.scss'
})
export class QuizHost {
  readonly topics = signal<Topic[]>([
    { id: 'aws', name: 'AWS' },
    { id: 'js', name: 'JavaScript' },
    { id: 'ng', name: 'Angular' },
  ]);

  readonly currentIndex = signal(0);
  readonly selectedTopic = signal('aws');
  readonly quizzes = signal<QuizzesByTopic>({});

  readonly filteredQuizzes: Signal<Quiz[]> = computed(() => {
    const quizzesByTopic = this.quizzes();
    const topicId = this.selectedTopic();
    return quizzesByTopic[topicId] ?? []
  });

  constructor(private quizzesService: QuizzesService) {
    this.quizzesService.getQuizzes().subscribe(data => this.quizzes.set(data));
  }

  onTopicSelected(topicId: string) {
    this.selectedTopic.set(topicId);
  }
}