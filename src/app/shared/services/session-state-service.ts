import { Injectable, signal, WritableSignal } from '@angular/core';
import { QuizzesByTopic, Topic } from '../models/interfaces';
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
  userBoardState = signal<UserQuizBoard>({ topic: "aws", level: "Beginner", score: 0 });
  readonly selectedTopic: WritableSignal<string> = signal('aws');
  readonly selectedLevel: WritableSignal<string> = signal('Beginner');

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<QuizzesByTopic> {
    return this.http.get<QuizzesByTopic>('/api/quizzes');
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('/api/quizzes-topics')
  }

  updateUserBoardState(): void {
    this.userBoardState.update((s) => ({
      ...s
    }));
  }
}
