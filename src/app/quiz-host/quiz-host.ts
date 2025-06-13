import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { QuizSelector } from '../quiz-selector/quiz-selector';
import { Quizzes } from '../quizzes/quizzes';
import { Quiz, Topic } from '../shared/models/interfaces';
import { QuizzesService } from '../quizzes/quizzes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-host',
  imports: [CommonModule, FormsModule, QuizSelector],
  templateUrl: './quiz-host.html',
  styleUrl: './quiz-host.scss'
})
export class QuizHost {
  topics = signal<Topic[]>([
    { id: 'aws', name: 'AWS'},
    { id: 'js', name: 'JavaScript'},
    { id: 'ng', name: 'Angular'},
  ]);

  currentIndex = signal(0);

  quizzes = signal<Quiz[]>([])

  selectedTopic = signal<string>('aws');
  
  filteredQuizzes = computed(() =>
    this.quizzes().filter(q => q.topicId === this.selectedTopic())
  );

  constructor(private quizzesService: QuizzesService) {
    this.quizzesService.getQuizzes().subscribe(data => this.quizzes.set(data));
    this.topics = signal<Topic[]>([
    { id: 'aws', name: 'AWS'},
    { id: 'js', name: 'JavaScript'},
    { id: 'ng', name: 'Angular'},
  ]);
  }

  onTopicSelected(topicId: string) {
    console.log('hier als nächstes schauen topic id wird richtig gesetzt ', topicId)
    this.selectedTopic.set(topicId);
  }
}
