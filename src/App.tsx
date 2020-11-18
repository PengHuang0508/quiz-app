import React, { useState } from 'react';
import { fetchQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { Difficulty, QuestionWithShuffledAnswers, UserAnswer } from './types';
// Styles
import './App.css';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const initialGameParams: {
    loading: boolean;
    isGameOver: boolean;
  } = {
    loading: false,
    isGameOver: true,
  };
  const initialQuizState: {
    questions: QuestionWithShuffledAnswers[];
    currentQuestionNumber: number;
    userAnswers: UserAnswer[];
    score: number;
  } = {
    questions: [],
    currentQuestionNumber: 0,
    userAnswers: [],
    score: 0,
  };
  const [gameParams, setGameParams] = useState(initialGameParams);
  const [quiz, setQuiz] = useState(initialQuizState);

  let isGameReady = !gameParams.loading && !gameParams.isGameOver;
  let currentQuestion = quiz.questions[quiz.currentQuestionNumber];
  let numberOfAnsweredQuestions = quiz.userAnswers.length;
  let isNextQuestionAvailable =
    numberOfAnsweredQuestions === quiz.currentQuestionNumber + 1 &&
    quiz.currentQuestionNumber !== TOTAL_QUESTIONS - 1;

  const startQuiz = async () => {
    setGameParams({
      ...gameParams,
      loading: true,
    });

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuiz({ ...initialQuizState, questions: newQuestions });

    setGameParams({
      loading: false,
      isGameOver: false,
    });
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameParams.isGameOver) {
      const userAnswer = e.currentTarget.value;

      const isCorrect = currentQuestion.correct_answer === userAnswer;

      let score = quiz.score;

      if (isCorrect) {
        score++;
      }

      const checkedUserAnswer = {
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correct_answer,
        userAnswer: userAnswer,
        isCorrect,
      };

      setQuiz({
        ...quiz,
        userAnswers: [...quiz.userAnswers, checkedUserAnswer],
        score,
      });
    }
  };

  const nextQuestion = () => {
    const nextQuestionNumber = quiz.currentQuestionNumber + 1;

    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameParams({
        ...gameParams,
        isGameOver: true,
      });
    } else {
      setQuiz({
        ...quiz,
        currentQuestionNumber: nextQuestionNumber,
      });
    }
  };

  return (
    <div className='app-wrapper'>
      <h1 className='app-title'>Quizzz</h1>
      <p className='quiz-score'>Score: {quiz.score}</p>

      <div className='quiz-wrapper'>
        {gameParams.loading && <p>Loading questions...</p>}

        {isGameReady && (
          <QuestionCard
            questionTotal={TOTAL_QUESTIONS}
            questionNumber={quiz.currentQuestionNumber + 1}
            questionType={currentQuestion.type}
            question={currentQuestion.question}
            answers={currentQuestion.answers}
            userAnswer={
              quiz.userAnswers
                ? quiz.userAnswers[quiz.currentQuestionNumber]
                : undefined
            }
            callback={checkAnswer}
          />
        )}
      </div>

      {gameParams.isGameOver ||
      numberOfAnsweredQuestions === TOTAL_QUESTIONS ? (
        <button className='quiz-button quiz-button-start' onClick={startQuiz}>
          START
        </button>
      ) : null}

      {isGameReady && (
        <button
          className='quiz-button quiz-button-next'
          onClick={nextQuestion}
          disabled={!isNextQuestionAvailable}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default App;
