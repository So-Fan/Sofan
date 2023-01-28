import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import "./PollPost.css";
import HeadOfPost from "../PostsComponents/HeadOfPost/HeadOfPost";
const PollPost = () => {
  const [surveyResults, setSurveyResults] = useState({
    red: 57,
    green: 98,
    blue: 120,
    orange: 32,
  });

  const totalVotes = Object.values(surveyResults).reduce((a, b) => a + b, 0);

  return (
    <section className="pollpost-container">
        <div className="headofpost-pollpost-container">
        <HeadOfPost/>
        </div>
      <div className="logique container">
        <h1>Survey Results</h1>
        <p>Question: What is your favorite color?</p>
        <div>
          <div>
            Rouge: {((surveyResults.red / totalVotes) * 100).toFixed(2)}%
          </div>
          <ProgressBar now={(surveyResults.red / totalVotes) * 100} />
        </div>
        <div>
          <div>
            Vert: {((surveyResults.green / totalVotes) * 100).toFixed(2)}%
          </div>
          <ProgressBar now={(surveyResults.green / totalVotes) * 100} />
        </div>
        <div>
          <div>
            Bleu: {((surveyResults.blue / totalVotes) * 100).toFixed(2)}%
          </div>
          <ProgressBar now={(surveyResults.blue / totalVotes) * 100} />
        </div>
        <div>
          <div>
            Orange: {((surveyResults.orange / totalVotes) * 100).toFixed(2)}%
          </div>
          <ProgressBar now={(surveyResults.orange / totalVotes) * 100} />
        </div>
        <div className="pollpost-wrap">
          <div className="progressbar-poll">
            {/* <div>
          <div>
            Rouge: {((surveyResults.red / totalVotes) * 100).toFixed(2)}%
          </div>
          <ProgressBar now={(surveyResults.red / totalVotes) * 100} />
        </div> */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default PollPost;
