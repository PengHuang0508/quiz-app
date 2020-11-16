import React, { useState } from 'react';
import { fetchQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { Difficulty, QuestionWithShuffledAnswers, UserAnswer } from './types';
// Styles
import { GlobalStyle } from './App.styles';
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

  const startQuiz = async () => {
    setGameParams({
      ...gameParams,
      loading: true,
    });

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuiz({ ...quiz, questions: newQuestions });

    setGameParams({
      loading: false,
      isGameOver: false,
    });
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameParams.isGameOver) {
      const userAnswer = e.currentTarget.value;

      const isCorrect = currentQuestion.correct_answer === userAnswer;

      if (isCorrect) {
        setQuiz({
          ...quiz,
          score: quiz.score + 1,
        });
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
    <React.Fragment>
      <GlobalStyle />
      <div className='App'>
        <h1>QUIZ TIME</h1>
        {gameParams.isGameOver ||
        numberOfAnsweredQuestions === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startQuiz}>
            START
          </button>
        ) : null}

        <p className='score'>Score: {quiz.score}</p>
        {gameParams.loading && <p>Loading Questions...</p>}

        {isGameReady && (
          <QuestionCard
            questionNumber={quiz.currentQuestionNumber + 1}
            questionTotal={TOTAL_QUESTIONS}
            question={currentQuestion.question}
            answers={currentQuestion.answers}
            userAnswers={
              quiz.userAnswers
                ? quiz.userAnswers[quiz.currentQuestionNumber]
                : undefined
            }
            callback={checkAnswer}
          />
        )}
        {isGameReady &&
          numberOfAnsweredQuestions === quiz.currentQuestionNumber + 1 &&
          quiz.currentQuestionNumber !== TOTAL_QUESTIONS - 1 && (
            <button className='next' onClick={nextQuestion}>
              NEXT
            </button>
          )}
      </div>
    </React.Fragment>
  );
};

export default App;
