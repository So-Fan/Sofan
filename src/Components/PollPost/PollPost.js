import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import "./PollPost.css";
import HeadOfPost from "../PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import AppProgressBar from "../AppProgressBar/AppProgressBar";

const PollPost = () => {
  const [surveyResults, setSurveyResults] = useState([57, 98, 120, 302]);

  const surveyCalc = () => {
    const totalPropositions = surveyResults.length;
    console.log(totalPropositions);
    const sum = surveyResults.reduce((acc, currentValue) => acc + currentValue);
    console.log(sum);
    const percentages = surveyResults.map((value) => (value / sum) * 100);
    // console.log(percentages);
    const roundedPercentages = percentages.map((percentage) =>
      percentage.toFixed(1)
    );
    console.log(roundedPercentages);
  };
  //   const totalVotes = Object.values(surveyResults).reduce((a, b) => a + b, 0);

  return (
    <section className="pollpost-container">
      <div className="pollpost-wrap">
        <div className="headofpost-pollpost-container">
          <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
        </div>
        {surveyCalc()}
        <div className="logique container">
          {/* <h1>Survey Results</h1>
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
    </div> */}
          {/* <div>
            <div>
              Orange: {((surveyResults.orange / totalVotes) * 100).toFixed(2)}%
            </div>
            <ProgressBar now={(surveyResults.orange / totalVotes) * 100} />
          </div> */}
        </div>
        <div className="pollpost-wrap">
          <div className="progressbar-poll-subwrap">
            <div className="progressbar-poll">
              <div className="pollstate-bar" style={{}}>
                Choix 1
              </div>
              <div className="progressbar-bootstrap-container">
                {/* <ProgressBar
                  now={(surveyResults.orange / totalVotes) * 100}
                  style={{ height: "40px"}}
                /> */}
                {/* <ProgressBar
                  variant="success"
                  style={{ height: "40px" }}
                  now={(surveyResults.orange / totalVotes) * 100}
                /> */}
              </div>
            </div>
          </div>
          <div className="progressbar-poll-subwrap">
            <div className="progressbar-poll"></div>
          </div>
          <div className="progressbar-poll-subwrap">
            <div className="progressbar-poll"></div>
          </div>
          <div className="progressbar-poll-subwrap">
            <div className="progressbar-poll"></div>
          </div>
          <div className="ageofpost-poll-container">
            <div className="ageofpost-poll-wrap">
              <div className="ageofpost-and-timeleft-poll">
                <div>2456 votes</div>
                <div>-</div>
                <div>1 day</div>
              </div>
            </div>
          </div>
          <div className="line-separation-pollpost-container">
            <div className="line-separation-pollpost"></div>
          </div>
          <LikesCommentsCounter />
        </div>
      </div>
    </section>
  );
};

export default PollPost;
