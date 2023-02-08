import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './AppProgressBar.css'

function AppProgressBar({progressValue, min = 0}) {

  const style = {
    barSize: {
      height: 40,
      width: "80%",
      // borderRadius: 10,
      overflow: 'hidden',
      transition: "500ms",
      background: "rgba(246, 212, 99, 0.5)"
      // background: rgba(246, 212, 99, 0.5); border-radius: 5px 0px 0px 5px;
    }
  }

  return <ProgressBar 
    style={style.barSize}
    className="progress-bar"
    min={min}
    now={progressValue}
    variant="progress-bar"
  />;
}
export default AppProgressBar;