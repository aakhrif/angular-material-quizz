import { Component, Signal, signal, effect } from '@angular/core';
import { QuizzesStateService } from '../../shared/services/quizzes-state/quizzes-state-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userboard',
  imports: [CommonModule],
  templateUrl: './userboard.html',
  styleUrl: './userboard.scss'
})
export class Userboard {

  readonly quiz = signal<string>("");
  readonly score = signal<string>("");
  readonly makedTopics = signal<string[]>([]);
  readonly makedLevels = signal<string[]>([]);

  readonly selectedTopic!: Signal<string>;
  readonly level!: Signal<string>;
  

  constructor(private quizzesStateService: QuizzesStateService) {
    effect(() => {
      const currentTopic = this.quizzesStateService.selectedTopic();
      if (!this.makedTopics().includes(currentTopic)) {
        this.makedTopics.set([...this.makedTopics(), currentTopic]);
      }
      const currentLevel = this.quizzesStateService.selectedLevel();
      if (!this.makedLevels().includes(currentLevel)) {
        this.makedLevels.set([...this.makedLevels(), currentLevel]);
      }
    });
  }
}
