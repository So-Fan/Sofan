import React, { useState } from "react";
import "./FourthStep.css";
function FourthStep() {
  // insert submit form here for backend
  const handleValidation = (e) => {
    e.preventDefault();
  };

  const [meetingsButton, setMeetingsButton] = useState(false);
  const [liveButton, setLiveButton] = useState(false);
  const [merchButton, setMerchButton] = useState(false);

  const handleMeetingButton = (e) => {
    e.preventDefault();
    setMeetingsButton(true);
    setLiveButton(false);
    setMerchButton(false);
  };

  const handleLiveButton = (e) => {
    e.preventDefault();
    setMeetingsButton(false);
    setLiveButton(true);
    setMerchButton(false);
    console.log(liveButton);
  };

  const handleMerchButton = (e) => {
    e.preventDefault();
    setMeetingsButton(false);
    setLiveButton(false);
    setMerchButton(true);
  };

  return (
    <section className="fourthstep-container">
      <div className="title-fourthstep">
        Quel genre de contreparties souhaitez-vous offrir à vos fans ?{" "}
      </div>
      <div className="fourthstep-form-container">
        <form>
          <button
            onClick={handleMeetingButton}
            className={
              meetingsButton
                ? "button-counterpart-fourthstep-selected"
                : "button-counterpart-fourthstep"
            }
          >
            <svg
              width="43"
              height="35"
              viewBox="0 0 43 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.5277 14.5004C25.1556 14.157 24.651 13.9641 24.1248 13.9641C23.5986 13.9641 23.094 14.157 22.7219 14.5004L21.319 15.7936C20.9529 16.1435 20.5149 16.4226 20.0307 16.6146C19.5466 16.8066 19.0258 16.9076 18.4988 16.9119C17.9719 16.9161 17.4493 16.8234 16.9615 16.6392C16.4738 16.455 16.0307 16.183 15.6581 15.839C15.2854 15.495 14.9907 15.086 14.7912 14.6358C14.5916 14.1856 14.4912 13.7032 14.4958 13.2168C14.5004 12.7303 14.6099 12.2496 14.8179 11.8027C15.0259 11.3557 15.3282 10.9515 15.7073 10.6136L26.8791 0.297449C29.5241 -0.257873 32.2914 -0.0293287 34.7875 0.950585C37.2837 1.9305 39.3817 3.6119 40.7831 5.75571C42.1845 7.89951 42.8181 10.3966 42.5937 12.8919C42.3693 15.3872 41.2984 17.7537 39.5332 19.6548L35.3502 23.5655L25.5277 14.4986V14.5004ZM3.77939 3.48827C5.83271 1.59315 8.51843 0.392659 11.4024 0.0808806C14.2863 -0.230898 17.1998 0.364261 19.672 1.77013L12.8994 8.02355C11.4326 9.37484 10.5965 11.2021 10.5697 13.1149C10.5429 15.0276 11.3276 16.8742 12.7561 18.26C14.1846 19.6459 16.1436 20.461 18.2146 20.5314C20.2855 20.6017 22.3041 19.9216 23.8391 18.6364L24.1248 18.3855L32.5444 26.1555L24.1248 33.9274C23.3806 34.6142 22.3713 35 21.319 35C20.2666 35 19.2573 34.6142 18.5131 33.9274L3.77741 20.3252C1.35876 18.0924 0 15.0642 0 11.9067C0 8.74924 1.35876 5.72105 3.77741 3.48827H3.77939Z"
                fill="black"
              />
            </svg>
            Meetings
          </button>
          <button
            onClick={handleLiveButton}
            className={
              liveButton
                ? "button-counterpart-fourthstep-selected"
                : "button-counterpart-fourthstep"
            }
          >
            <svg
              width="49"
              height="35"
              viewBox="0 0 49 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.8125 0C33.3927 0 33.9491 0.230469 34.3593 0.640704C34.7695 1.05094 35 1.60734 35 2.1875V11.375L46.4034 3.39063C46.5674 3.27568 46.7598 3.20796 46.9596 3.19485C47.1594 3.18173 47.359 3.22372 47.5366 3.31624C47.7142 3.40876 47.863 3.54825 47.9667 3.71952C48.0705 3.89079 48.1252 4.08726 48.125 4.2875V30.7125C48.1252 30.9127 48.0705 31.1092 47.9667 31.2805C47.863 31.4517 47.7142 31.5912 47.5366 31.6838C47.359 31.7763 47.1594 31.8183 46.9596 31.8052C46.7598 31.792 46.5674 31.7243 46.4034 31.6094L35 23.625V32.8125C35 33.3927 34.7695 33.9491 34.3593 34.3593C33.9491 34.7695 33.3927 35 32.8125 35H2.1875C1.60734 35 1.05094 34.7695 0.640704 34.3593C0.230468 33.9491 0 33.3927 0 32.8125V2.1875C0 1.60734 0.230468 1.05094 0.640704 0.640704C1.05094 0.230469 1.60734 0 2.1875 0H32.8125ZM14 10.5634C13.7983 10.5634 13.6028 10.633 13.4465 10.7606C13.2902 10.8882 13.1828 11.0658 13.1425 11.2634L13.125 11.4362V23.5594C13.125 23.7011 13.1594 23.8407 13.2252 23.9661C13.2911 24.0916 13.3864 24.1992 13.503 24.2797C13.6197 24.3602 13.7541 24.4111 13.8948 24.4281C14.0354 24.4452 14.1782 24.4278 14.3106 24.3775L14.4703 24.2987L23.9969 18.235C24.108 18.1639 24.2017 18.0686 24.2708 17.9561C24.3399 17.8437 24.3826 17.7171 24.3959 17.5858C24.4092 17.4545 24.3925 17.3219 24.3473 17.198C24.3021 17.074 24.2294 16.9619 24.1347 16.87L23.9969 16.7606L14.4703 10.6969C14.3292 10.6094 14.166 10.5639 14 10.5656V10.5634Z"
                fill="black"
              />
            </svg>
            Live
          </button>
          <button
            onClick={handleMerchButton}
            className={
              merchButton
                ? "button-counterpart-fourthstep-selected"
                : "button-counterpart-fourthstep"
            }
          >
            <svg
              width="37"
              height="39"
              viewBox="0 0 37 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.21053 2.05263V16.4211L18.4737 11.2895L28.7368 16.4211V2.05263H34.8947C35.4391 2.05263 35.9612 2.26889 36.3462 2.65383C36.7311 3.03878 36.9474 3.56087 36.9474 4.10526V36.9474C36.9474 37.4918 36.7311 38.0139 36.3462 38.3988C35.9612 38.7837 35.4391 39 34.8947 39H2.05263C1.50824 39 0.986145 38.7837 0.601202 38.3988C0.216259 38.0139 0 37.4918 0 36.9474V4.10526C0 3.56087 0.216259 3.03878 0.601202 2.65383C0.986145 2.26889 1.50824 2.05263 2.05263 2.05263H8.21053ZM18.4737 10.2632L9.23684 0H27.7105L18.4737 10.2632ZM20.5263 16.9055L18.4737 15.8792L16.4211 16.9055V34.8947H20.5263V16.9055ZM24.6316 22.5789V26.6842H32.8421V22.5789H24.6316Z"
                fill="black"
              />
            </svg>
            Merch
          </button>
        </form>
        <div className="validation-button-container">
          <button className="validation-button" onClick={handleValidation}>
            Valider
          </button>
        </div>
      </div>
    </section>
  );
}
export default FourthStep;
