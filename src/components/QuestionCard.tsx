import React, { useState } from 'react';
// Types
import { QuestionCardProps } from '../types';
// Utils
import { decodeString } from '../utils';
// Styles
import './QuestionCard.css';

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionTotal,
  questionNumber,
  questionType,
  question,
  answers,
  userAnswer,
  callback,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const MultipleChoiceQuestion = () => (
    <div className='quiz-answers-wrapper'>
      {['A', 'B', 'C', 'D'].map((choice, index) => (
        <button
          key={index}
          className={`quiz-answers-button ${isSelected && 'selected'}`}
          value={answers[index]}
          onClick={callback}
          disabled={!!userAnswer}
        >
          {choice}. {decodeString(answers[index])}
        </button>
      ))}
    </div>
  );

  const TrueOrFalseQuestion = () => (
    <div className='quiz-answers-wrapper'>
      {answers.map((answer, index) => (
        <button
          key={index}
          className='quiz-answers-button'
          value={answer}
          onClick={(e) => {
            callback(e);
          }}
          disabled={!!userAnswer}
        >
          {answer}
        </button>
      ))}
    </div>
  );

  const DisplayAnswers = () => {
    if (questionType === 'multiple') {
      return <MultipleChoiceQuestion />;
    } else if (questionType === 'boolean') {
      return <TrueOrFalseQuestion />;
    } else return null;
  };

  return (
    <div className='question-card-container'>
      <p className='questionNumber'>
        Question: {questionNumber} / {questionTotal}
      </p>
      {/* <p dangerouslySetInnerHTML={{ __html: question }} /> */}
      <p className='question-card-question'>{decodeString(question)}</p>
      <DisplayAnswers />
    </div>
  );
};

export default QuestionCard;
