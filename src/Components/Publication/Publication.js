import React, { useState } from "react";
import "./Publication.css";
// import testLogo from "../../Assets/Image/likelogorouge.svg"
import logo from "../../Assets/Image/likelogo.svg";
// import logoLikeRed from "../../Assets/Image/likelogo-red.svg";
function Publication() {
  const [athleteName, setAthleteName] = useState("Romain Attanasio");
  const [isPostLiked, setIsPostedLiked] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsPostedLiked(!isPostLiked);
  };
  const handleChange = (e) => {};
  return (
    <>
      <div className="publication-container">
        <div className="publication-content">
          <div className="publication-head-container">
            <div className="publication-head-left-container">
              {/* Backend here */}
              <div className="profilepic-athlete-publication">IMG</div>
              {/* Backend here */}
              <div className="athlete-name-publication">{athleteName}</div>
              {/* Backend here */}
              <div className="age-publication">3h</div>
            </div>
            <div className="publication-head-right-container">
              {/* Backend here si contenu PREMIUM ou FREE */}
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
          {/* Backend here */}
          <div className="publication-media">MEDIA</div>
          <div className="likes-comments-container-publication">
            <div className="likes-publication">
              <div className="logo-likes-publication">
                {isPostLiked ? (
                  <>
                    <>
                      <div className="logo-like-red">
                        <button className="button-like-toggle-color"  onClick={handleClick}>
                          <svg
                            width={22}
                            height={19}
                            viewBox="0 0 22 19"
                            fill="none"
                            version="1.1"
                            id="svg44"
                          >
                            <defs id="defs48" />
                            <path
                              d="m 6.97514,2.28213 c 1.24267,0.02553 2.45311,0.59193 3.32076,2.09537 0.3224,0.55763 1.1271,0.55763 1.4508,0 0.8679,-1.50318 2.0784,-2.06958 3.3208,-2.09537 1.2427,-0.02709 2.5148,0.55892 3.2994,1.50189 1.514,1.82171 1.7074,5.00527 -0.5092,7.23558 L 11.0212,16.91 4.18363,11.0196 C 1.96832,8.78954 2.16047,5.60573 3.67578,3.78402 4.46038,2.84105 5.73246,2.25504 6.97514,2.28213 Z M 7.01125,0.60459 C 5.23544,0.566675 3.51199,1.35953 2.38616,2.71209 0.303937,5.21627 0.178844,9.38045 3.00001,12.2109 c 0.01496,0.0152 0.03096,0.0297 0.0472,0.0444 l 7.42739,6.3967 c 0.3145,0.2701 0.7792,0.2701 1.0934,0 l 7.4287,-6.3967 c 0.0163,-0.0147 0.031,-0.0292 0.0459,-0.0444 C 21.8638,9.38019 21.7371,5.21627 19.6552,2.71209 18.5309,1.35928 16.8059,0.566417 15.0311,0.60459 13.5589,0.635025 12.139,1.45316 11.0212,2.79256 9.9036,1.45316 8.48373,0.635025 7.01125,0.60459 Z"
                              fill="#000000"
                              id="path42"
                            />
                            <path
                              style={{
                                fill: "#ff0000",
                                stroke: "none",
                                strokeWidth: 0,
                              }}
                              d="M 7.5527159,13.867641 C 5.512685,12.106541 3.9595644,10.714722 3.7698805,10.477678 3.3394552,9.9397843 2.992175,9.2624746 2.7732861,8.5339942 2.5341929,7.7382721 2.517617,6.5446486 2.7344686,5.7387475 3.1758031,4.0985839 4.4024821,2.8312066 5.9226547,2.4447851 6.4357269,2.3143643 7.3612834,2.31488 7.8641764,2.445867 c 0.869008,0.2263478 1.7145707,0.8760498 2.2771026,1.7496492 0.302135,0.4692086 0.518934,0.6250882 0.86938,0.6250882 0.373161,0 0.592142,-0.152872 0.903471,-0.6307184 0.156573,-0.240317 0.48886,-0.6295546 0.738415,-0.8649726 0.729064,-0.6877616 1.466842,-0.9793592 2.481468,-0.9807694 3.358147,-0.00467 5.390003,3.8290853 3.775462,7.1236241 -0.474332,0.9678939 -0.673094,1.1665369 -4.246803,4.2442619 -1.859615,1.601524 -3.441376,2.963962 -3.515024,3.027639 -0.130273,0.112635 -0.2278,0.03472 -3.5949321,-2.872028 z"
                              id="path380"
                            />
                          </svg>
                        </button>
                      </div>
                    </>
                  </>
                ) : (
                  <>
                    <button className="button-like-toggle-color" onClick={handleClick}>
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
                    </button>
                  </>
                )}
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
              {/* Backend here */}
              <div className="comments-counter-publication">10 comments</div>
            </div>
          </div>
          {/* Backend here */}
          <div className="show-comments-button-publication">
            Show 10 comments
          </div>
          <div className="line-separation-comments-publication"></div>
          <div className="input-comment-container-publication">
            <div className="input-comment-elements">
              <div className="emoji-comment-publication">
                <a href="">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7194 0.175049C9.55602 0.17847 6.52317 1.43664 4.2863 3.67351C2.04944 5.91037 0.791263 8.94323 0.787842 12.1066C1.38442 27.916 24.0544 27.909 24.651 12.1066C24.6476 8.94323 23.3894 5.91037 21.1526 3.67351C18.9157 1.43664 15.8828 0.17847 12.7194 0.175049V0.175049ZM12.7194 22.0496C10.0833 22.0467 7.55591 20.9982 5.69187 19.1342C3.82783 17.2701 2.77933 14.7428 2.77644 12.1066C3.27359 -1.06584 22.1653 -1.06186 22.6624 12.1066C22.6595 14.7428 21.611 17.2701 19.747 19.1342C17.8829 20.9982 15.3556 22.0467 12.7194 22.0496ZM7.74793 9.62089C7.74793 9.22533 7.90507 8.84597 8.18477 8.56627C8.46447 8.28657 8.84382 8.12944 9.23938 8.12944C9.63494 8.12944 10.0143 8.28657 10.294 8.56627C10.5737 8.84597 10.7308 9.22533 10.7308 9.62089C10.7308 10.0164 10.5737 10.3958 10.294 10.6755C10.0143 10.9552 9.63494 11.1123 9.23938 11.1123C8.84382 11.1123 8.46447 10.9552 8.18477 10.6755C7.90507 10.3958 7.74793 10.0164 7.74793 9.62089ZM14.708 9.62089C14.708 9.22533 14.8652 8.84597 15.1449 8.56627C15.4246 8.28657 15.8039 8.12944 16.1995 8.12944C16.595 8.12944 16.9744 8.28657 17.2541 8.56627C17.5338 8.84597 17.6909 9.22533 17.6909 9.62089C17.6909 10.0164 17.5338 10.3958 17.2541 10.6755C16.9744 10.9552 16.595 11.1123 16.1995 11.1123C15.8039 11.1123 15.4246 10.9552 15.1449 10.6755C14.8652 10.3958 14.708 10.0164 14.708 9.62089ZM18.5281 15.6284C17.9439 16.6584 17.1004 17.5176 16.0814 18.1208C15.0625 18.7239 13.9034 19.05 12.7194 19.0667C11.5346 19.0502 10.3747 18.7242 9.35473 18.1211C8.33476 17.5179 7.49019 16.6587 6.90477 15.6284C6.79906 15.4634 6.74446 15.2709 6.74784 15.0749C6.75121 14.879 6.81241 14.6884 6.92375 14.5272C7.03508 14.3659 7.19159 14.2411 7.3736 14.1685C7.55562 14.0959 7.75503 14.0787 7.94679 14.1191C9.47571 14.6951 11.087 15.0227 12.7194 15.0895C14.3492 15.0219 15.9577 14.6943 17.4841 14.1191C17.676 14.0782 17.8757 14.095 18.0581 14.1674C18.2405 14.2398 18.3973 14.3646 18.5089 14.526C18.6206 14.6873 18.6819 14.8781 18.6854 15.0743C18.6888 15.2705 18.6341 15.4633 18.5281 15.6284Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </div>
              <input
                placeholder="Add a comment"
                className="input-comment-publication"
                type="text"
                onChange={handleChange}
              />
              <div className="publish-comments-button-container-publication">
                <a href="">
                  {/* Backend here */}
                  <button onClick={handleClick}>Publish</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Publication;
