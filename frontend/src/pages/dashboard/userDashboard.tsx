import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBarComponent from "../../components/SideBarComponent";
import RecipeSearchComponent from "../../components/RecipeSearchComponent";
import DefaultIcon from "../../images/default-profile-pic.jpg";
import ProfileEditor from "../../components/ProfileEditor";
import Tooltip from "../../components/Tooltip";
import axios from "axios";


import { UseAuthContext } from "../../hooks/useAuthContext"
//translation imports
import { useTranslation } from "react-i18next";

import { Recipe } from "../../components/HomeRecipes";
//routing
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";




interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface ImageUpload {
  image: File | null;
}

function UserDashboardHome() {

  //tooltip 

  const [showTooltip, setShowTooltip] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  //translation variable 
  const { t, i18n } = useTranslation();
  // Define selectedLanguage state and handleLanguageChange function
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  //show and hide language select meby
  const [showLanguageSelectMenu, setShowLanguageSelectMenu] = useState(false)




  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);



  const { user } = UseAuthContext();

  //dashboard states
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [userSelectedImage, setUserSelectedImage] = useState('');
  const [icon, setIcon] = useState<File | null>(null);
  const [imageUpload, setImageUpload] = useState<ImageUpload>({ image: null }); // Initialize with image property
  const [isExpanded, setIsExpanded] = useState<boolean>(false)


  //check window size
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1250)
    }
    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
    }
  }




  //upload user image to cloudinary media gallery
  const ProfileUpload = async (file: File) => {
    const formData = new FormData();

    //user file
    formData.append('file', file);

    //Where in cloudinary image will be stored
    formData.append('upload_preset', 'RecipeAppUserPhotos');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/deewhii9n/image/upload', formData);
      const imageUrl = response.data.secure_url;

      // Handle imageUrl as needed, e.g., update userSelectedImage
      setUserSelectedImage(imageUrl);

      // Call the function to send the updated profile picture URL to the server
      updateProfilePictureOnServer(imageUrl);

      ;
    } catch (error) {

      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  }
  const updateProfilePictureOnServer = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/user/update_picture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`, // Include the authorization header
        },
        body: JSON.stringify({ profilePictureUrl: imageUrl }), // Change imageUrl to profilePictureUrl
      });

      if (!response.ok) {
        console.error(`Failed to update profile picture. Status: ${response.status}`);
        return;
      }

      const responseData = await response.json();
      console.log(responseData.message); // Success message from the server
    } catch (error) {
      console.error("Error updating the profile picture on the server:", error);
      // Handle the error, e.g., show an error message
    }
  };



  //get user profile picture from server

  const fetchUserProfilePicture = async () => {
    try {
      const response = await fetch("/api/user/profile_picture", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch profile picture. Status: ${response.status}`);
        return null;
      }

      const responseData = await response.json();
      return responseData.profilePictureUrl;
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return null;
    }
  };


  useEffect(() => {
    // Fetch the user's profile picture URL when the component mounts
    if (user) {
      fetchUserProfilePicture().then(profilePictureUrl => {
        if (profilePictureUrl) {
          setUserSelectedImage(profilePictureUrl);
        }
      });
    }
  }, [user]); // Run this effect whenever the "user" changes


  const handleSubmit = async () => {
    if (icon) {
      setImageUpload({ image: icon }); // Update the image property
      await ProfileUpload(icon);
    }

    setShowProfileEditor(false)
  }



  //state for search component


  const handleRecipeClick = (recipe: Recipe) => {
    //get recipe id 
    const id = recipe._id
    //navigate to that page based on the id of the recipe

    navigate(`/individual-recipe/${id}`);
  };
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);


  // open sidebar on mobile devices



  useEffect(() => {

    const button = document.querySelector(".hamburger-menu");
    if (button) {
      button.setAttribute("aria-expanded", "false");
    }

  }, [location])

  const handleHamburgerMenuClick = () => {
    // Update the aria-expanded attribute when the "hamburger-menu" is clicked
    const button = document.querySelector(".hamburger-menu");
    setIsExpanded(!isExpanded)
    if (button) {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    }
  }

  //Language should be english by default for all users
  useEffect(() => {
    i18n.changeLanguage('ENG');
  }, []);




  useEffect(() => {
    console.log(user.role, 'site user')
  }, [user])

  return (
    <div className="dashboard" style={{ overflow: isExpanded ? "hidden" : "" }}>

      {showProfileEditor ? <div className="dashboard-overlay"></div> : null}

      <SideBarComponent isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <header>

        <button onClick={handleHamburgerMenuClick} style={{ padding: 0 }} className="hamburger-menu" aria-controls="primary-navigation" aria-expanded="false">
          <svg fill="#000" width="20" viewBox="0 0 100 100">
            <rect className="line top" width="80" height="10" x="10" y="25" rx="5">
            </rect>
            <rect className="line middle" width="80" height="10" x="10" y="45" rx="5">
            </rect>
            <rect className="line bottom" width="80" height="10" x="10" y="65" rx="5">
            </rect>
          </svg>
        </button>
        {/*hamburger icon used for sidebar. Should onlow show on movile devices */}
        <div className="dashboard-header" style={{ display: isMobile && isExpanded ? "none" : "flex" }}>


          <div className="recipe-container">
            <RecipeSearchComponent searchedRecipes={searchedRecipes} setSearchedRecipes={setSearchedRecipes} />


            <div className="recipe-list">
              {searchedRecipes.length > 0 &&
                searchedRecipes.map((recipe: Recipe) => (
                  <div onClick={() => handleRecipeClick(recipe)} key={recipe._id} className="recipe-item">
                    <p>{recipe.title}</p>
                  </div>
                ))}
            </div>
          </div>
          <ul className="Language-Select-Menu" >
            <div className="select-field">
              {selectedLanguage ? <p>{selectedLanguage} </p> : <p>ENG</p>}

              <svg
                onClick={() => setShowLanguageSelectMenu(!showLanguageSelectMenu)}
                className="language-chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#000"
                xmlns="http://www.w3.org/2000/svg"

              >
                <path
                  d="M10 13.75L3.75 7.5L4.625 6.625L10 12L15.375 6.625L16.25 7.5L10 13.75Z"
                  fill="#000"
                />
              </svg>
            </div>

            {showLanguageSelectMenu && (
              <div className="options">
                <li className={`Language-Select-Item ${selectedLanguage === "en" ? "selected" : ""}`} onClick={() => {
                  handleLanguageChange("ENG");
                  setShowLanguageSelectMenu(!showLanguageSelectMenu); // Toggle the menu
                }}>
                  <span className="Language-Icon" role="img" aria-label="ENG">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_4_7146)">
                        <path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill="#F0F0F0" />
                        <path d="M14.9365 6.52175H8.47831H8.47828V0.0634863C8.15804 0.0217969 7.83155 0 7.5 0C7.16845 0 6.84196 0.0217969 6.52175 0.0634863V6.52169V6.52172H0.0634863C0.0217969 6.84196 0 7.16839 0 7.5C0 7.83161 0.0217969 8.15804 0.0634863 8.47825H6.52169H6.52172V14.9365C6.84196 14.9782 7.16845 15 7.5 15C7.83155 15 8.15804 14.9782 8.47825 14.9365V8.47831V8.47828H14.9365C14.9782 8.15804 15 7.83161 15 7.5C15 7.16839 14.9782 6.84196 14.9365 6.52175V6.52175Z" fill="#D80027" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_7146">
                          <rect width="15" height="15" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </span>
                  <span className="Language-Text">ENG</span>
                </li>
                <li className={`Language-Select-Item ${selectedLanguage === "es" ? "selected" : ""}`} onClick={() => { handleLanguageChange("ESP"); setShowLanguageSelectMenu(!showLanguageSelectMenu) }}>
                  <span className="Language-Icon" role="img" aria-label="Spain">
                    <svg width="15" height="15" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_4_7292)">
                        <path d="M0 256C0 287.314 5.633 317.31 15.923 345.043L256 367.304L496.077 345.043C506.367 317.31 512 287.314 512 256C512 224.686 506.367 194.69 496.077 166.957L256 144.696L15.923 166.957C5.633 194.69 0 224.686 0 256H0Z" fill="#FFDA44" />
                        <path d="M496.077 166.957C459.906 69.473 366.071 0 256 0C145.929 0 52.0939 69.473 15.9229 166.957H496.077Z" fill="#D80027" />
                        <path d="M15.9229 345.043C52.0939 442.527 145.929 512 256 512C366.071 512 459.906 442.527 496.077 345.043H15.9229Z" fill="#D80027" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_7292">
                          <rect width="512" height="512" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </span>
                  <span className="Language-Text">ESP</span>
                </li>
                <li className={`Language-Select-Item ${selectedLanguage === "ch" ? "selected" : ""}`} onClick={() => { handleLanguageChange("CHN"); setShowLanguageSelectMenu(!showLanguageSelectMenu) }}>
                  <span className="Language-Icon" role="img" aria-label="Spain">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_4_7124)">
                        <path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill="#D80027" />
                        <path d="M4.10449 4.56445L4.75195 6.55664H6.84668L5.15332 7.79004L5.80078 9.78223L4.10449 8.55176L2.4082 9.78223L3.05859 7.79004L1.3623 6.55664H3.45703L4.10449 4.56445Z" fill="#FFDA44" />
                        <path d="M8.8916 11.6162L8.39648 11.0068L7.66406 11.291L8.08887 10.6318L7.59375 10.0195L8.35254 10.2217L8.78027 9.5625L8.82129 10.3477L9.58301 10.5498L8.84766 10.8311L8.8916 11.6162Z" fill="#FFDA44" />
                        <path d="M9.87598 9.8291L10.1104 9.0791L9.46875 8.625L10.2539 8.61328L10.4854 7.86328L10.7402 8.60742L11.5254 8.59863L10.8955 9.06738L11.1475 9.81152L10.5059 9.35742L9.87598 9.8291Z" fill="#FFDA44" />
                        <path d="M11.2031 5.50488L10.8574 6.21094L11.4199 6.75879L10.6436 6.64746L10.2979 7.35059L10.1631 6.57715L9.38379 6.46582L10.0811 6.09961L9.94629 5.32324L10.5088 5.87109L11.2031 5.50488Z" fill="#FFDA44" />
                        <path d="M8.91211 3.36621L8.85352 4.14844L9.58301 4.44434L8.81836 4.63184L8.7627 5.41699L8.34961 4.74902L7.58496 4.93652L8.0918 4.33594L7.67578 3.6709L8.40527 3.9668L8.91211 3.36621Z" fill="#FFDA44" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_7124">
                          <rect width="15" height="15" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </span>
                  <span className="Language-Text">CHN</span>
                </li>
              </div>
            )}
          </ul>
          <div className="dashboard-buttons-container display-f">
            <div style={{ position: "relative" }}>
              <img style={{ position: "relative" }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowProfileEditor(true)}
                className="avatar"
                src={userSelectedImage || DefaultIcon}
                alt="user-icon"

              />
              {showTooltip && (
                <Tooltip text={"Edit Profile"}></Tooltip>
              )}
            </div>



            <div className="bell">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 21H14C14 22.1 13.1 23 12 23C10.9 23 10 22.1 10 21ZM21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2C13.1 2 14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19ZM17 11C17 8.2 14.8 6 12 6C9.2 6 7 8.2 7 11V18H17V11Z" fill="black" />
              </svg>

              <div className="notification-icon-container">2</div>
            </div>

          </div>
        </div>
      </header>
      <Outlet />

      {showProfileEditor && <ProfileEditor
        userSelectedImage={userSelectedImage}
        imageUpload={handleImg}
        image={icon || imageUpload.image} // Combine icon and imageUpload.image
        handleSubmit={handleSubmit}
        setShowProfileEditor={setShowProfileEditor}
      />}

    </div>
  );
}

export default UserDashboardHome;
