export interface Quiz {
    id: number,
    question: string,
    selectMultiple: boolean,
    choices: Array<Choice>
}

export interface Choice {
    id: string,
    isCorrect: boolean,
    text: string
}