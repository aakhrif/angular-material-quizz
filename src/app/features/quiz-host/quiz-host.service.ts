import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuizzesByTopic, Topic } from "../../shared/models/interfaces";

@Injectable({ providedIn: 'root' })
export class QuizHostService {
    constructor(private http: HttpClient) {}

    getQuizzes(): Observable<QuizzesByTopic> {
        return this.http.get<QuizzesByTopic>('/api/quizzes');
    }

    getTopics(): Observable<Topic[]> {
        return this.http.get<Topic[]>('/api/quizzes-topics')
    }
}