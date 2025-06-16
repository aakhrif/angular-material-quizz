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

export const TECH_ICONS: Record<string, string> = {
    js: 'assets/icons/js.svg',
    php: 'assets/icons/php.svg',
    aws: 'assets/icons/aws.svg',
    ng: 'assets/icons/ng.svg',
    docker: 'assets/icons/docker.svg',
};

export enum QuizLevel {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced"
}