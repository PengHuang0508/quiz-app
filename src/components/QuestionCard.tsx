import React from 'react';
// Types
import { QuestionCardProps } from '../types';

const QuestionCard: React.FC<QuestionCardProps> = ({
  answers,
  question,
  questionNumber,
  questionTotal,
  userAnswers,
  callback,
}) => (
  <div>
    <p className='questionNumber'>
      Question: {questionNumber} / {questionTotal}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />

    <div>
      {answers.map((answer, index) => (
        <div key={index}>
          <button disabled={!!userAnswers} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
