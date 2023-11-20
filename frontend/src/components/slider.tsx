// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css/navigation";
import "swiper/css/pagination";
//Images
import testimonialCircleOneLarge from "../images/testimonial-circle-1-large.png";
import testimonialCircleTwoLarge from "../images/testimonial-circle-2-large.png";
import testimonialCircleThreeLarge from "../images/testimonial-circle-3-large.png";


import { useRef, useEffect } from "react";
interface SliderProps {}

function Slider(props: SliderProps) {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    breakpoints: {
      "@0.5": {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      "@0.75": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      "@1.50": {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  //slider States

  //slider refs
  const cardOne = useRef(null);
  const cardTwo = useRef(null);
  const cardThree = useRef(null);

  //fade in effect

  //card hover effect

  const cardArray = [cardOne, cardTwo, cardThree];

  cardArray.forEach((card) => {});

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="swiper-card" ref={cardOne}>
            {" "}
            <img
              className="testimonial-img"
              src={testimonialCircleOneLarge}
              alt="testimonial-1-img-large"
            />
            <div className="name">
              <h4>Lance Hyland</h4>
              <p>Organic Farm Manager</p>
            </div>
            <div className="quote-circle">
              <svg
                width="26"
                height="26"
                viewBox="0 0 36 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.679 0.261865C5.14838 5.09809 0.964815 10.7271 0.128245 17.1488C-1.17411 27.1459 7.76609 32.0392 12.296 27.6426C16.8259 23.246 14.1105 17.6655 10.8304 16.1401C7.55028 14.6146 5.54438 15.1459 5.89428 13.1074C6.24418 11.069 10.9108 5.41719 15.0106 2.78509C15.2826 2.55379 15.3861 2.10499 15.1242 1.76449C14.9519 1.54059 14.614 1.10144 14.1105 0.447014C13.6702 -0.125256 13.2484 -0.103835 12.679 0.261865Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M32.5041 0.261865C24.9736 5.09809 20.79 10.7271 19.9534 17.1488C18.6511 27.1459 27.5913 32.0392 32.1212 27.6426C36.6511 23.246 33.9357 17.6655 30.6556 16.1401C27.3755 14.6146 25.3695 15.1459 25.7195 13.1074C26.0694 11.069 30.736 5.41719 34.8358 2.78509C35.1078 2.55379 35.2113 2.10499 34.9493 1.76449C34.7771 1.54059 34.4392 1.10144 33.9357 0.447014C33.4954 -0.125256 33.0736 -0.103835 32.5041 0.261865Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="text">
              “FlavourFinder ignited my culinary journey! Learning to cook
              online is a flavourful adventure.”
            </p>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-card" ref={cardTwo}>
            {" "}
            <img
              className="testimonial-img"
              src={testimonialCircleTwoLarge}
              alt="testimonial-2-img-large"
            />
            <div className="name">
              {" "}
              <h4>Shae Cox</h4>
              <p>Marketing Consultant</p>
            </div>
            <div className="quote-circle">
              <svg
                width="26"
                height="26"
                viewBox="0 0 36 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.679 0.261865C5.14838 5.09809 0.964815 10.7271 0.128245 17.1488C-1.17411 27.1459 7.76609 32.0392 12.296 27.6426C16.8259 23.246 14.1105 17.6655 10.8304 16.1401C7.55028 14.6146 5.54438 15.1459 5.89428 13.1074C6.24418 11.069 10.9108 5.41719 15.0106 2.78509C15.2826 2.55379 15.3861 2.10499 15.1242 1.76449C14.9519 1.54059 14.614 1.10144 14.1105 0.447014C13.6702 -0.125256 13.2484 -0.103835 12.679 0.261865Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M32.5041 0.261865C24.9736 5.09809 20.79 10.7271 19.9534 17.1488C18.6511 27.1459 27.5913 32.0392 32.1212 27.6426C36.6511 23.246 33.9357 17.6655 30.6556 16.1401C27.3755 14.6146 25.3695 15.1459 25.7195 13.1074C26.0694 11.069 30.736 5.41719 34.8358 2.78509C35.1078 2.55379 35.2113 2.10499 34.9493 1.76449C34.7771 1.54059 34.4392 1.10144 33.9357 0.447014C33.4954 -0.125256 33.0736 -0.103835 32.5041 0.261865Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="text">
              "FlavourFinder made me a kitchen pro. Their online cooking
              platform is practical and empowering!"
            </p>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-card" ref={cardThree}>
            {" "}
            <img
              className="testimonial-img"
              src={testimonialCircleThreeLarge}
              alt="testimonial-3-img-large"
            />
            <div className="name">
              <h4>James Krever</h4>
              <p>Proffessional Chef</p>
            </div>
            <div className="quote-circle">
              <svg
                width="26"
                height="26"
                viewBox="0 0 36 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.679 0.261865C5.14838 5.09809 0.964815 10.7271 0.128245 17.1488C-1.17411 27.1459 7.76609 32.0392 12.296 27.6426C16.8259 23.246 14.1105 17.6655 10.8304 16.1401C7.55028 14.6146 5.54438 15.1459 5.89428 13.1074C6.24418 11.069 10.9108 5.41719 15.0106 2.78509C15.2826 2.55379 15.3861 2.10499 15.1242 1.76449C14.9519 1.54059 14.614 1.10144 14.1105 0.447014C13.6702 -0.125256 13.2484 -0.103835 12.679 0.261865Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M32.5041 0.261865C24.9736 5.09809 20.79 10.7271 19.9534 17.1488C18.6511 27.1459 27.5913 32.0392 32.1212 27.6426C36.6511 23.246 33.9357 17.6655 30.6556 16.1401C27.3755 14.6146 25.3695 15.1459 25.7195 13.1074C26.0694 11.069 30.736 5.41719 34.8358 2.78509C35.1078 2.55379 35.2113 2.10499 34.9493 1.76449C34.7771 1.54059 34.4392 1.10144 33.9357 0.447014C33.4954 -0.125256 33.0736 -0.103835 32.5041 0.261865Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="text">
              “FlavourFinder honed my kitchen techniques. Their digital cooking
              platform is efficient and engaging!”
            </p>
          </div>
        </div>
      </div>
      <button className="curved-btn testimonials-btn">More Testimonials</button>
    </div>
  );
}

export default Slider;
