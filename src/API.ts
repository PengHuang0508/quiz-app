// Types
import { Difficulty, Question } from './types';
// Utils
import { shuffleArray } from './utils';

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
  const data = await (await fetch(endpoint)).json();

  return data.results.map((question: Question) => {
    const combinedAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    const shuffledAnswers = shuffleArray(combinedAnswers);

    return {
      ...question,
      answers: shuffledAnswers,
    };
  });
};
