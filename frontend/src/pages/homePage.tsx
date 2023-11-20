import React, { useState, useEffect, useRef } from "react";
import heroImg from "../images/hero-graphic.png";
import PlayIcon from "../svg/playIcon";
import secondaryHeroGraphic from "../images/secondary-hero-graphic.png";

import ScrollIndicator from "../svg/ScrollIndicator";
import DownArrow from "../svg/DownArrow";
import UserIcon from "../svg/UserIcon";
import Burger from "../svg/Burger";
import ChefHat from "../svg/ChefHat";
import Heart from "../svg/Heart";
import Dollar from "../svg/Dollar";

//components
import Slider from "../components/slider";
import MockupComponent from "../components/MockupComponent";
import FooterComponent from "../components/FooterComponent";

//react router linking

import { Link } from "react-router-dom";
import NavbarComponent from "../components/navbar";

interface HomePageProps {}

function HomePage() {
  // Home page states
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const [currentUserIteration, setCurrentUserIteration] = useState(0);
  const [currentRecipieIteration, setCurrentRecipieIteration] = useState(0);
  const RecipieStat = 1000;
  const customerStat = 50000;

  // Ref for the info section
  const infoSectionRef = useRef<HTMLDivElement | null>(null);

  // Function to handle the hover event on ScrollIndicator
  const handleHover = () => {
    setIsArrowHovered(true);
  };

  // Function to handle the mouse leave event on ScrollIndicator
  const handleLeave = () => {
    setIsArrowHovered(false);
  };

  // Function to start counting (User Stat)
  const startCounting = () => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= customerStat) {
        setCurrentUserIteration(i);
        i += 1000; // Adjust the increment as needed
      } else {
        clearInterval(interval);
        startCountingRecipieStat();
      }
    }, 30); // You can adjust the interval speed if needed
  };

  // Use useEffect to delay the start of counting by 5 seconds
  useEffect(() => {
    const delayMilliseconds = 2000; // 2 seconds
    setTimeout(startCounting, delayMilliseconds);
  }, []);

  // Helper function to add a plus sign to the value when it reaches 50000
  const formatIteration = (iteration: number) => {
    if (iteration === 50000) {
      return `${iteration}+`;
    }
    return iteration.toString();
  };

  // Function to start counting (Recepie Stat)
  const startCountingRecipieStat = () => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= RecipieStat) {
        setCurrentRecipieIteration(i);
        i += 100; // Adjust the increment as needed
      } else {
        clearInterval(interval);
      }
    }, 50); // You can adjust the interval speed if needed
  };

  // Helper function to add a plus sign to the value when it reaches 1000
  const formatRecipieIteration = (iteration: number) => {
    if (iteration === 1000) {
      return `${iteration}+`;
    }
    return iteration.toString();
  };

  // Function to scroll to the info section
  const scrollToInfoSection = () => {
    if (infoSectionRef.current) {
      window.scrollTo({
        top: infoSectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
    <NavbarComponent/>
      <main>
        <section className="hero">
          <div className="container">
            <div className="even-columns">
              <div>
                <div className="flow">
                  <h1>Wake Up To The Flavour Revolution</h1>
                  <p className="pbl-4">
                    Join a vibrant community of food enthusiasts on{" "}
                    <span>
                      {" "}
                      Flavour Finder, the recipe website that brings{" "}
                    </span>{" "}
                    culinary creativity to life!
                  </p>
                  <div className="cta-buttons pb-5">
                    <Link to="/signup" className="join-up-btn">
                      Join Up
                    </Link>
                    <div className="play-btn-container">
                      <button className="How-it-works-btn">How It Works</button>
                    </div>
                  </div>
                  <div className="display-f">
                    <div className="stats-hero-section mr-2">
                      <div className="even-columns" id="hero-stat-columns">
                        <div className="display-f" id="users-info-column">
                          <div className="icon-circle">
                            <UserIcon />
                          </div>
                          <div className="ml-2 user-stat-details">
                            <h3>{formatIteration(currentUserIteration)}</h3>
                            <p>Happy Users</p>
                          </div>
                        </div>
                        <div className="display-f" id="users-info-column">
                          <div className="icon-circle">
                            <Burger />
                          </div>
                          <div
                            className="ml-2 user-stat-details"
                            style={{ minWidth: "50%" }}
                          >
                            <h3>
                              {formatRecipieIteration(currentRecipieIteration)}
                            </h3>
                            <p>Recipies</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-graphic-column">
                <img src={heroImg} alt="hero-img"></img>
              </div>
            </div>
          </div>
          <div className="scroll-indicator-container">
            <ScrollIndicator
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              onClick={scrollToInfoSection} // Add this onClick handler
            />
            <p>Scroll Down</p>
            <DownArrow isHovered={isArrowHovered} />
          </div>
        </section>
      </main>
      <section id="info-section" ref={infoSectionRef}>
        <div className="container">
          <div className="three-column-layout">
            <div className="info-card">
              <div className="icon-circle">
                <ChefHat />
              </div>
              <h4 className="pbl-2">Learn From Professionals</h4>
              <p>
                Here you can learn collaboratively with{" "}
                <span> other aspiring chefs and even watch </span> tutorials
                from the top Chefs!
              </p>
            </div>
            <div className="info-card">
              <div className="icon-circle">
                <Heart />
              </div>
              <h4 className="pbl-2">Save Your Favourite Recipes</h4>
              <p>
                Save Up to 1000 recipes and add{" "}
                <span>more flavor to your skillset! </span>
              </p>
            </div>
            <div className="info-card">
              <div className="icon-circle">
                <Dollar />
              </div>
              <h4 className="pbl-2">Learn Your Way</h4>
              <p>
                Learn your way with free<span> and paid packages. </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="slider-component">
        <div className="container-slider">
          <h2>What Do Our Users Think?</h2>
          <Slider />
        </div>
      </section>
      <section id="mockup-component">
        <MockupComponent />
      </section>

      <FooterComponent />
    </>
  );
}

export default HomePage;
