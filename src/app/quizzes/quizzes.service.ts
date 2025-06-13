import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quiz } from "../shared/models/interfaces";

@Injectable({ providedIn: 'root' })
export class QuizzesService {
    constructor(private http: HttpClient) {}

    getQuizzes(): Observable<Quiz[]> {
        return this.http.get<Quiz[]>('/api/quizzes');
    }
}