import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Quiz, QuizLevel, QuizzesByTopic, Topic } from '../../models/interfaces';
import { forkJoin, mapTo, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface UserQuizBoard {
  topic: string,
  level: string,
  score: number
}

interface QuizInteractionState {
  filteredQuizzes: Quiz[],
  currentIndex: number,
  selectedSingleChoice: string,
  selectedMultiChoices: string[],
  answerChecked: boolean,
  isLastAnswerCorrect: boolean
}

@Injectable({
  providedIn: 'root'
})
export class QuizzesStateService {

  readonly selectedTopic = signal<string>('aws');
  readonly selectedLevel = signal<QuizLevel>(QuizLevel.Beginner);
  readonly currentIndex = signal<number>(0);
  readonly quizzes = signal<QuizzesByTopic>({});
  readonly topics = signal<Topic[]>([]);
  readonly levels = signal<QuizLevel[]>([]);

  private readonly quizInteractionState = signal<QuizInteractionState>({
    filteredQuizzes: [],
    currentIndex: 0,
    selectedSingleChoice: '',
    selectedMultiChoices: [],
    answerChecked: false,
    isLastAnswerCorrect: false
  });

  readonly currentQuiz = computed(() => {
    const s = this.quizInteractionState();
    return s.filteredQuizzes[s.currentIndex];
  });

  readonly selectedSingleChoice = computed(() => this.quizInteractionState().selectedSingleChoice);
  readonly selectedMultiChoices = computed(() => this.quizInteractionState().selectedMultiChoices);
  readonly answerChecked = computed(() => this.quizInteractionState().answerChecked);
  readonly isLastAnswerCorrect = computed(() => this.quizInteractionState().isLastAnswerCorrect);

  constructor(private http: HttpClient) {
    this.getTopics().subscribe(data => this.topics.set(data));
    this.getQuizzes().subscribe(data => this.quizzes.set(data));
    this.levels.set(Object.values(QuizLevel));

    effect(() => {
      const topicId = this.selectedTopic();
      const allQuizzes = this.quizzes();
      const topicQuizzes = allQuizzes[topicId] ?? [];

      this.updateFilteredQuizzes(topicQuizzes);
    });
  }

  // loadInitialData(): Promise<void> {
  //   return forkJoin([
  //     this.getQuizzes(),
  //     this.getTopics()
  //   ]).pipe(
  //     tap(([quizzes, topics]) => {
  //       this.quizzes.set(quizzes);
  //       this.topics.set(topics);
  //     }),
  //     mapTo(void 0)
  //   ).toPromise();
  // }

  updateFilteredQuizzes(quizzes: Quiz[]) {
    this.quizInteractionState.set({
      filteredQuizzes: quizzes,
      currentIndex: 0,
      selectedSingleChoice: '',
      selectedMultiChoices: [],
      answerChecked: false,
      isLastAnswerCorrect: false
    });
  }

  submitAnswer() {
    const quiz = this.currentQuiz();
    const { selectedSingleChoice, selectedMultiChoices } = this.quizInteractionState();

    let isCorrect = false;
    if (!quiz.selectMultiple) {
      isCorrect = !!quiz.choices.find(c => c.id === selectedSingleChoice)?.isCorrect;
    } else {
      const correctIds = quiz.choices.filter(c => c.isCorrect).map(c => c.id);
      isCorrect = correctIds.length === selectedMultiChoices.length &&
        correctIds.every(id => selectedMultiChoices.includes(id));
    }

    this.quizInteractionState.update(s => ({
      ...s,
      answerChecked: true,
      isLastAnswerCorrect: isCorrect
    }));
  }

  goNext() {
    this.quizInteractionState.update(s => {
      const nextIndex = s.currentIndex + 1;
      const isEnd = nextIndex >= s.filteredQuizzes.length;
      return {
        ...s,
        currentIndex: isEnd ? s.currentIndex : nextIndex,
        selectedSingleChoice: '',
        selectedMultiChoices: [],
        answerChecked: false,
        isLastAnswerCorrect: false
      };
    });
  }

  getFilteredQuizzes(): Signal<Quiz[]> {
    return computed(() => {
      const topicId = this.selectedTopic();
      return this.quizzes()[topicId] ?? [];
    });
  }

  updateSingleChoice(value: string) {
    this.quizInteractionState.update(s => ({
      ...s,
      selectedSingleChoice: value,
      answerChecked: false,
      isLastAnswerCorrect: false
    }));
  }

  toggleMultiChoice(choiceId: string, checked: boolean) {
    this.quizInteractionState.update(s => {
      const selected = new Set(s.selectedMultiChoices);
      checked ? selected.add(choiceId) : selected.delete(choiceId);
      return {
        ...s,
        selectedMultiChoices: Array.from(selected),
        answerChecked: false,
        isLastAnswerCorrect: false
      };
    });
  }

  private getQuizzes(): Observable<QuizzesByTopic> {
    return this.http.get<QuizzesByTopic>('/api/quizzes');
  }

  private getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('/api/quizzes-topics');
  }
}
