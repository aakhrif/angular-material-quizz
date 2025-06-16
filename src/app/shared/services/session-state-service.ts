import { Injectable, signal, WritableSignal } from '@angular/core';

interface UserQuizBoard {
  topic: string,
  level: string,
  score: number
}

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {
 // topic (language) - level - score
  userBoardState = signal<UserQuizBoard>({ topic:"aws", level: "Beginner", score: 0});
  readonly selectedTopic: WritableSignal<string> = signal('aws');
  constructor() { }

  updateUserBoardState(): void {
    this.userBoardState.update((s) => ({
      ...s
    }));
  }
}
