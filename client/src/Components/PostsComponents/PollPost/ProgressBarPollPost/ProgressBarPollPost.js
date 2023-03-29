import React from 'react'
import "./ProgressBarPollPost.css"
function ProgressBarPollPost({isVoted, choiceNumberArray, choiceName, choiceSelected, checkMark, showSurveyResult}) {


  return (
    <><div className="progressbar-poll-subwrap">
    <div className="progressbar-poll">
      {isVoted ? (
        <>
          <div
            className="pollstate-bar"
            style={{ width: `${choiceNumberArray}%` }}
          >
            <div className="choice-name">
              {choiceName}
              {choiceSelected && (
                <>
                  <img
                    className="checkmark-logo"
                    src={checkMark}
                    alt=""
                  />
                </>
              )}
            </div>
            <div className="survey-percent">{choiceNumberArray}%</div>
          </div>
        </>
      ) : (
        <>
          <button onClick={showSurveyResult}>
            <div className="pollstate-bar" style={{ width: "0%" }}>
              <div className="survey-percent"></div>
              <div className="choice-name">{choiceName}</div>
            </div>
          </button>
        </>
      )}
    </div>
  </div></>
  )
}

export default ProgressBarPollPost