export enum Difficulty {
  EASY = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionWithShuffledAnswers = Question & { answers: string[] };

export type UserAnswer = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
};

export type QuestionCardProps = {
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  question: string;
  questionNumber: number;
  questionTotal: number;
  userAnswers: UserAnswer | undefined;
};
