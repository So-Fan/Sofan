import React, { useState } from "react";
import "./Publication.css";
function Publication() {
  const [athleteName, setAthleteName] = useState("Romain Attanasio");

  return (
    <>
      <div className="publication-container">
        <div className="publication-content">
          <div className="publication-head-container">
            <div className="publication-head-left-container">
              <div className="profilepic-athlete-publication">IMG</div>
              <div className="athlete-name-publication">{athleteName}</div>
              <div className="age-publication">3h</div>
            </div>
            <div className="publication-head-right-container">
              <div className="publication-type">Free</div>
              <div className="dropdown-button-publication">
                <div className="dropdown-button-point"></div>
                <div className="dropdown-button-point"></div>
                <div className="dropdown-button-point"></div>
              </div>
            </div>
          </div>
          <div className="publication-description">
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
          </div>
          <div className="publication-media">MEDIA</div>
          <div className="likes-comments-container-publication">
            <div className="likes-publication">
              <div className="logo-likes-publication">
                <svg
                  width="22"
                  height="19"
                  viewBox="0 0 22 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.97514 2.28213C8.21781 2.30766 9.42825 2.87406 10.2959 4.3775C10.6183 4.93513 11.423 4.93513 11.7467 4.3775C12.6146 2.87432 13.8251 2.30792 15.0675 2.28213C16.3102 2.25504 17.5823 2.84105 18.3669 3.78402C19.8809 5.60573 20.0743 8.78929 17.8577 11.0196L11.0212 16.91L4.18363 11.0196C1.96832 8.78954 2.16047 5.60573 3.67578 3.78402C4.46038 2.84105 5.73246 2.25504 6.97514 2.28213ZM7.01125 0.60459C5.23544 0.566675 3.51199 1.35953 2.38616 2.71209C0.303937 5.21627 0.178844 9.38045 3.00001 12.2109C3.01497 12.2261 3.03097 12.2406 3.04721 12.2553L10.4746 18.652C10.7891 18.9221 11.2538 18.9221 11.568 18.652L18.9967 12.2553C19.013 12.2406 19.0277 12.2261 19.0426 12.2109C21.8638 9.38019 21.7371 5.21627 19.6552 2.71209C18.5309 1.35928 16.8059 0.566417 15.0311 0.60459C13.5589 0.635025 12.139 1.45316 11.0212 2.79256C9.9036 1.45316 8.48373 0.635025 7.01125 0.60459Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="likes-counter-publication">29 likes</div>
            </div>
            <div className="comments-publication">
              <div className="logo-comments-publication">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.94654 18.4088L0.789196 19.5551L1.93549 14.3977C1.18058 12.9857 0.786785 11.4088 0.789196 9.80768C0.789196 4.42421 5.1531 0.0603027 10.5366 0.0603027C15.9201 0.0603027 20.284 4.42421 20.284 9.80768C20.284 15.1912 15.9201 19.5551 10.5366 19.5551C8.93543 19.5575 7.35856 19.1637 5.94654 18.4088ZM6.22921 16.3492L6.86571 16.6903C7.995 17.2938 9.25616 17.6083 10.5366 17.6056C12.0789 17.6056 13.5865 17.1483 14.8689 16.2914C16.1512 15.4346 17.1507 14.2167 17.7409 12.7918C18.3311 11.3669 18.4855 9.79904 18.1847 8.28639C17.8838 6.77374 17.1411 5.38429 16.0505 4.29373C14.96 3.20318 13.5705 2.4605 12.0579 2.15961C10.5452 1.85873 8.97733 2.01315 7.55245 2.60336C6.12757 3.19356 4.9097 4.19304 4.05286 5.4754C3.19601 6.75776 2.73867 8.2654 2.73867 9.80768C2.73867 11.108 3.05546 12.3595 3.65493 13.4785L3.99511 14.1151L3.35666 16.9876L6.22921 16.3492Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="comments-counter-publication">10 comments</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Publication;
