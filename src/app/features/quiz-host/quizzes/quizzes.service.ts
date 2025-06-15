import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quiz, QuizzesByTopic } from "../../../shared/models/interfaces";

@Injectable({ providedIn: 'root' })
export class QuizzesService {
    constructor(private http: HttpClient) {}

    getQuizzes(): Observable<QuizzesByTopic> {
        return this.http.get<QuizzesByTopic>('/api/quizzes');
    }
}