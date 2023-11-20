import React, {useEffect, useState} from 'react'
import { UseAuthContext } from '../hooks/useAuthContext'

interface RecipeFilterComponentProps {
    filteredRecipes: any;
    setFilteredRecipes: React.Dispatch<React.SetStateAction<any>>;
  }
  
  function RecipeFilterComponent({ filteredRecipes, setFilteredRecipes }: RecipeFilterComponentProps) {

    const [selectedCuisine, setSelectedCuisine] = useState('ALL')
    const [showCusineMenu, setShowCuisineMenu] = useState(false)

  // Create a function to fetch recipes by cuisine
  const fetchRecipesByCuisine = async (cuisine: string) => {
    console.log(filteredRecipes, "filtered recipes click")
    console.log(cuisine, 'cuisine frontend')
    try {
      const response = await fetch(`/api/recipes/cuisine/${cuisine}` ,
      {          headers: { Authorization: `Bearer ${user.token}` }});
      if (response.ok) {
        const recipes = await response.json();
        
        console.log(recipes)
        setFilteredRecipes(recipes)
        // Handle the retrieved recipes (e.g., set them in your component state)
      } else {
        setFilteredRecipes(null)
        console.error('Error fetching recipes by cuisine:', response.status, response.statusText);
        // Handle the error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error fetching recipes by cuisine:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  // Change selected cuisine based on click
  const handleCusinineClick = (cuisine: string) => {

    setSelectedCuisine(cuisine);
    fetchRecipesByCuisine(cuisine); // Call the fetch function with the selected cuisine
  };


  useEffect(() => {
    console.log(selectedCuisine, 'selected cusisine')
  }, [selectedCuisine])

    // cuisinde icons that will conditionally render

  const cuisineIcons:  Record<string, JSX.Element> ={
        Indian: (
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4_7180)">
                    <path d="M7.5 15.9893C11.6421 15.9893 15 12.6314 15 8.48926C15 4.34712 11.6421 0.989258 7.5 0.989258C3.35786 0.989258 0 4.34712 0 8.48926C0 12.6314 3.35786 15.9893 7.5 15.9893Z" fill="#F0F0F0" />
                    <path d="M7.49994 0.989258C4.52648 0.989258 1.95727 2.71968 0.744141 5.2284H14.2557C13.0426 2.71968 10.4734 0.989258 7.49994 0.989258V0.989258Z" fill="#FF9811" />
                    <path d="M7.49994 15.9891C10.4734 15.9891 13.0426 14.2587 14.2557 11.75H0.744141C1.95727 14.2587 4.52648 15.9891 7.49994 15.9891Z" fill="#6DA544" />
                    <path d="M7.50004 11.098C8.94077 11.098 10.1087 9.93003 10.1087 8.4893C10.1087 7.04856 8.94077 5.88062 7.50004 5.88062C6.0593 5.88062 4.89136 7.04856 4.89136 8.4893C4.89136 9.93003 6.0593 11.098 7.50004 11.098Z" fill="#0052B4" />
                    <path d="M7.50006 10.1197C8.40052 10.1197 9.13049 9.38978 9.13049 8.48932C9.13049 7.58885 8.40052 6.85889 7.50006 6.85889C6.5996 6.85889 5.86963 7.58885 5.86963 8.48932C5.86963 9.38978 6.5996 10.1197 7.50006 10.1197Z" fill="#F0F0F0" />
                    <path d="M7.49994 6.47729L8.00294 7.61806L9.24231 7.48326L8.50591 8.48923L9.24231 9.4952L8.00294 9.3604L7.49994 10.5012L6.99694 9.3604L5.75757 9.49517L6.49397 8.48923L5.75757 7.48326L6.99694 7.61806L7.49994 6.47729Z" fill="#0052B4" />
                </g>
                <defs>
                    <clipPath id="clip0_4_7180">
                        <rect width="15" height="15" fill="white" transform="translate(0 0.989258)" />
                    </clipPath>
                </defs>
            </svg>
        ),
        Spanish: (
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
        ),
        French: (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4_7156)">
                    <path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill="#F0F0F0" />
                    <path d="M15.0002 7.50006C15.0002 4.27532 12.9649 1.52625 10.1089 0.466553V14.5336C12.9649 13.4739 15.0002 10.7248 15.0002 7.50006V7.50006Z" fill="#D80027" />
                    <path d="M0 7.50006C0 10.7248 2.03534 13.4739 4.89132 14.5336V0.466553C2.03534 1.52625 0 4.27532 0 7.50006Z" fill="#0052B4" />
                </g>
                <defs>
                    <clipPath id="clip0_4_7156">
                        <rect width="15" height="15" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        Chinese: (
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
        ),
        Italian :
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_7187)">
<path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill="#F0F0F0"/>
<path d="M15.0002 7.49981C15.0002 4.27508 12.9649 1.52601 10.1089 0.466309V14.5333C12.9649 13.4736 15.0002 10.7246 15.0002 7.49981V7.49981Z" fill="#D80027"/>
<path d="M0 7.49981C0 10.7246 2.03531 13.4736 4.89132 14.5333V0.466309C2.03531 1.52601 0 4.27508 0 7.49981Z" fill="#6DA544"/>
</g>
<defs>
<clipPath id="clip0_4_7187">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>

    };



    const {user} = UseAuthContext();
  return (
    <div>
        <div className="country-cuisine-filter">
            <ul className="select-field display-f">
                {selectedCuisine === "ALL" && (
                    <svg  className='globe-svg' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20L14 18L15 17V15H13V14L12 13H9V16L11 18V19.931C7.06 19.436 4 16.072 4 12L5 13H7V11H9L12 8V6H10L9 5V4.589C10.9231 3.80478 13.0769 3.80478 15 4.589V6L14 7V9L15 10L18.13 6.87C18.8914 7.78093 19.4401 8.85022 19.736 10H18L16 12V14L17 15H19L19.286 15.286C18.029 18.061 15.239 20 12 20Z" fill="black"/>
                    </svg>
                )}
     {selectedCuisine !== 'ALL' && cuisineIcons[selectedCuisine]}
                    {selectedCuisine}
                    <svg
                    onClick={() => setShowCuisineMenu(!showCusineMenu)}
      className="filter-chevron"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.3s",
        
        cursor: "pointer",
     
      }}
 
    >
      <path
        d="M10 13.75L3.75 7.5L4.625 6.625L10 12L15.375 6.625L16.25 7.5L10 13.75Z"
        fill="#000"
      />
    </svg>
</ul>
{showCusineMenu &&
 (
<div className="options">
    <li onClick={() => { handleCusinineClick("ALL");  setShowCuisineMenu(!showCusineMenu)}}>
    <svg className='globe-svg' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20L14 18L15 17V15H13V14L12 13H9V16L11 18V19.931C7.06 19.436 4 16.072 4 12L5 13H7V11H9L12 8V6H10L9 5V4.589C10.9231 3.80478 13.0769 3.80478 15 4.589V6L14 7V9L15 10L18.13 6.87C18.8914 7.78093 19.4401 8.85022 19.736 10H18L16 12V14L17 15H19L19.286 15.286C18.029 18.061 15.239 20 12 20Z" fill="black"/>
                    </svg>ALL</li>
    <li onClick={() =>  {handleCusinineClick("Indian"); setShowCuisineMenu(!showCusineMenu)}}>
        {cuisineIcons.Indian}
 Indian</li>
 <li onClick={() => {
    handleCusinineClick("Spanish");
    setShowCuisineMenu(!showCusineMenu);
}}>
    {cuisineIcons.Spanish}
    Spanish
</li>
    <li onClick={() => { handleCusinineClick("French"); setShowCuisineMenu(!showCusineMenu)}}>  {cuisineIcons.French}
 French</li>
    <li onClick={() => { handleCusinineClick("Chinese"); setShowCuisineMenu(!showCusineMenu)}}>  {cuisineIcons.Chinese}
 Chinese</li>
    <li onClick={() => { handleCusinineClick("Italian"); setShowCuisineMenu(!showCusineMenu)}}>  {cuisineIcons.Italian}
 Italian</li>
</div>
 )}

        </div>
        <div className="meal-type-filter"></div>
    </div>
  )
}

export default RecipeFilterComponent