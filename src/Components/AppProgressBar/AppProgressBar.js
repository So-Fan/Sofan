import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './AppProgressBar.css'

function AppProgressBar({progressValue, min = 0}) {

  const style = {
    barSize: {
      height: 25,
      width: "100%",
      borderRadius: 10,
      overflow: 'hidden',
      // animamiton : .5s
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