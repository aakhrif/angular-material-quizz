export interface QuizzesByTopic {
    [topicId: string]: Quiz[]
}

export interface Quiz {
    id: number,
    question: string,
    selectMultiple: boolean,
    choices: Array<Choice>
    topicId: string
}

export interface Choice {
    id: string,
    isCorrect: boolean,
    text: string
}

export interface Topic {
    id: string,
    name: string
}