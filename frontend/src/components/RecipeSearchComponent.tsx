import React, { useState } from "react";
import { UseAuthContext } from "../hooks/useAuthContext";
import { Recipe } from "./HomeRecipes";

interface RecipeSearchComponentProps {
  searchedRecipes: Recipe[]; // Define the type for searchedRecipes
  setSearchedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>; // Define the type for setSearchedRecipes
}

function RecipeSearchComponent({ searchedRecipes, setSearchedRecipes }: RecipeSearchComponentProps) {
  const { user } = UseAuthContext();

  const [searchValue, setSearchValue] = useState(""); // State to hold the search value

  const getSearchedRecipes = async () => {
   
  
      const response = await fetch(`/api/recipes/getSearchedRecipe?search=${searchValue}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },

      });

      const searchedRecipe =  await response.json()

      setSearchedRecipes(searchedRecipe)
      console.log(searchedRecipe)
 
  };

  const handleInputChange = (e:any) => {
    const value = e.target.value;
    setSearchValue(value); // Update the searchValue state
    console.log(value, "searchbar content");

    // Automatically trigger the getRecipes function when the input changes
    getSearchedRecipes();
  };

  return (
    <div className="searchbar-container">
      <svg
        className="search-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.7963 20.2039L17.3441 15.7499C18.679 14.0103 19.3023 11.8281 19.0874 9.64594C18.8725 7.46377 17.8356 5.44503 16.1871 3.99924C14.5385 2.55344 12.4018 1.78886 10.2102 1.86058C8.01865 1.93231 5.93644 2.83497 4.38595 4.38546C2.83546 5.93595 1.9328 8.01817 1.86107 10.2097C1.78935 12.4013 2.55393 14.538 3.99972 16.1866C5.44552 17.8352 7.46426 18.872 9.64643 19.0869C11.8286 19.3018 14.0108 18.6785 15.7504 17.3436L20.2063 21.8005C20.3109 21.9051 20.4352 21.9882 20.5719 22.0448C20.7086 22.1014 20.8552 22.1306 21.0032 22.1306C21.1512 22.1306 21.2977 22.1014 21.4344 22.0448C21.5712 21.9882 21.6954 21.9051 21.8 21.8005C21.9047 21.6958 21.9877 21.5716 22.0443 21.4349C22.101 21.2982 22.1301 21.1516 22.1301 21.0036C22.1301 20.8556 22.101 20.7091 22.0443 20.5724C21.9877 20.4356 21.9047 20.3114 21.8 20.2067L21.7963 20.2039ZM4.12536 10.4999C4.12536 9.23902 4.49925 8.00647 5.19974 6.95811C5.90024 5.90975 6.89587 5.09265 8.06075 4.61014C9.22563 4.12763 10.5074 4.00138 11.7441 4.24737C12.9807 4.49335 14.1166 5.10051 15.0082 5.99207C15.8997 6.88363 16.5069 8.01954 16.7529 9.25617C16.9988 10.4928 16.8726 11.7746 16.3901 12.9395C15.9076 14.1044 15.0905 15.1 14.0421 15.8005C12.9938 16.501 11.7612 16.8749 10.5004 16.8749C8.81014 16.8731 7.18964 16.2009 5.99447 15.0058C4.7993 13.8106 4.1271 12.1901 4.12536 10.4999Z"
          fill="black"
        />
      </svg>
      <input
        onChange={handleInputChange} // Pass the input change handler
        type="text"
        placeholder="Find Flavour..."
      />


    </div>
  );
}

export default RecipeSearchComponent;
