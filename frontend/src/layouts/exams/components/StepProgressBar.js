import React from 'react';
import './StepProgressBar.css';
import PropTypes from 'prop-types';

const StepProgressBar = ({ steps, currentStep, answers }) => {
    const stepWidth = 100 / (steps - 1); // Calculate the width for each step node
    const progressWidth = stepWidth * currentStep; // Calculate the width of the progress bar

    return (
        <div className="step-progress-bar">
            <div className="step-progress-void" style={{ width: `${stepWidth*19}%` }} />
            <div className="step-progress" style={{ width: `${progressWidth}%` }} />
            <div className="step-nodes">
                {Array.from({ length: steps }).map((_, index) => {
                    const nodeAnswer = answers[index];
                    const isCorrect = nodeAnswer && nodeAnswer.trueAnswer;

                    return (
                        <div
                            key={index}
                            className={`step-node ${index < currentStep ? isCorrect ? 'completed correct' : 'completed incorrect' : index===currentStep?'current':''}`}
                            style={{ left: `${stepWidth * index}%` }}
                        >
                            {index + 1}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

StepProgressBar.propTypes = {
    steps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            answer: PropTypes.string.isRequired,
            trueAnswer: PropTypes.bool.isRequired,
        })
    ),
};

export default StepProgressBar;
