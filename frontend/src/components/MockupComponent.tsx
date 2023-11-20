import React from "react";

//images



import MockupComponentImgLarge from "../images/mockup-component-large.png";

function MockupComponent() {
  return (
    <>
      <div className="mockup">
        <div className="container">
          <div className="text">
            <h2>Download The App</h2>
            <p>Find the best recipes on multiple different devices </p>
          </div>
          <div className="mockup-cta-btns">
            <button className="mockup-btn">
              <svg
                className="icon"
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6638 23.0371C15.3716 24.3036 13.9606 24.1036 12.6024 23.5037C11.1651 22.8904 9.84643 22.8638 8.32999 23.5037C6.43114 24.3303 5.42897 24.0903 4.29493 23.0371C-2.14006 16.3313 -1.19063 6.11923 6.11466 5.74594C7.89483 5.83926 9.13436 6.73248 10.1761 6.81247C11.7321 6.49251 13.2222 5.57263 14.8837 5.69261C16.8748 5.85259 18.3781 6.65249 19.3671 8.09231C15.2529 10.5853 16.2287 16.0646 20 17.5978C19.2484 19.5975 18.2726 21.5839 16.6506 23.0504L16.6638 23.0371ZM10.0442 5.66595C9.84643 2.69299 12.2332 0.23997 14.976 0C15.3584 3.43957 11.8903 5.99924 10.0442 5.66595Z"
                  fill="black"
                />
              </svg>

              <div className="text-wrapper">
                <span className="subtext">Download From</span>
                <span className="main-text">App Store</span>
              </div>
            </button>

            <button className="mockup-btn">
              <svg
                className="icon"
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.793 13.2979L16.874 15.5159L13.359 12.0229L16.902 8.50194L20.793 10.7039C21.0226 10.8338 21.2137 11.0223 21.3466 11.2502C21.4795 11.478 21.5496 11.7371 21.5496 12.0009C21.5496 12.2647 21.4795 12.5238 21.3466 12.7517C21.2137 12.9796 21.0226 13.1681 20.793 13.2979ZM0.112001 0.923936C0.0377908 1.1041 -0.000264586 1.29709 1.38457e-06 1.49194V22.5089C1.38457e-06 22.7259 0.0450013 22.9279 0.124001 23.1089L11.279 12.0219L0.112001 0.923936ZM12.319 10.9889L15.577 7.75094L2.225 0.194936C1.93881 0.0304719 1.60549 -0.0325977 1.279 0.0159364L12.319 10.9889ZM12.319 13.0559L1.319 23.9889C1.617 24.0249 1.931 23.9729 2.225 23.8059L15.549 16.2659L12.319 13.0559Z"
                  fill="black"
                />
              </svg>

              <div className="text-wrapper">
                <span className="subtext">Download From</span>
                <span className="main-text">Google Play</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mockup-graphic-column">
        <img
          className="mockup-graphic"
          src={MockupComponentImgLarge}
          alt="mockup component image large"
        ></img>
      </div>
    </>
  );
}

export default MockupComponent;
