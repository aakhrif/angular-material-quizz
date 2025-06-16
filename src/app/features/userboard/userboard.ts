import { Component, Signal, signal, effect } from '@angular/core';
import { SessionStateService } from '../../shared/services/session-state-service';
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
  

  constructor(private sessionStateService: SessionStateService) {
    effect(() => {
      const currentTopic = this.sessionStateService.selectedTopic();
      if (!this.makedTopics().includes(currentTopic)) {
        this.makedTopics.set([...this.makedTopics(), currentTopic]);
      }
      const currentLevel = this.sessionStateService.selectedLevel();
      if (!this.makedLevels().includes(currentLevel)) {
        this.makedLevels.set([...this.makedLevels(), currentLevel]);
      }
    });
  }
}
