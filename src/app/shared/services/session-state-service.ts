import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Quiz, QuizLevel, QuizzesByTopic, Topic } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface UserQuizBoard {
  topic: string,
  level: string,
  score: number
}

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {

  readonly selectedTopic = signal<string>('aws');
  readonly selectedLevel = signal<QuizLevel>(QuizLevel.Beginner);
  readonly currentIndex = signal<number>(0);
  readonly quizzes = signal<QuizzesByTopic>({});
  readonly topics = signal<Topic[]>([]);

  constructor(private http: HttpClient) {
    this.getTopics().subscribe(data => this.topics.set(data));
    this.getQuizzes().subscribe(data => this.quizzes.set(data));
  }

  getFilteredQuizzes(): Signal<Quiz[]> {
    return computed(() => {
      const topicId = this.selectedTopic();
      return this.quizzes()[topicId] ?? [];
    });
  }
  getQuizzes(): Observable<QuizzesByTopic> {
    return this.http.get<QuizzesByTopic>('/api/quizzes');
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('/api/quizzes-topics');
  }
}
