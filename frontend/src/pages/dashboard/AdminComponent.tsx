import React, { ChangeEvent, FormEvent, useState } from 'react';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

function AdminComponent() {
  // form states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '', unit: '' }]);
  const [recipeTitle, setRecipeTitle] = useState<string>('');

  //show cuisine menu
  const [showCuisines, setShowCusines] = useState(false)
  const [cusisine, setCuisine] = useState<string>('');



  const uploadImage = async () => {
    if (!imageFile) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "RecipeAppUserPhotos");

    try {
      //post image to cloudinary from input
      const response = await fetch("https://api.cloudinary.com/v1_1/deewhii9n/image/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // if response works set the uploadedImage to the json response from cloudinary
        const uploadedImage = await response.json();

        //set the image url from the cloudinary addition
        const imageUrl = uploadedImage.secure_url;
        console.log("Image uploaded successfully. URL:", imageUrl);
        return imageUrl;
      } else {
        console.error(`Failed to upload image. Status: ${response.status}`);
        return null;
      }
    } catch (error) {

      //if image doesn't upload correctly then throw an error
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // function that runs when the file input changes values
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      //add correct file to state
      setImageFile(event.target.files[0]);
    }
  };

  const handleIngredientChange = (index: number, key: keyof Ingredient, value: string) => {
    //updated ingredients equals all previous ingredients 
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][key] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    //get ALL the previous ingredients and add a new object to it
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const handleDeleteIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    if (imageUrl) {
      const recipeData = {
        title: recipeTitle,
        img: imageUrl,
        ingredients: ingredients,
        cuisine: cusisine
      };

      await createRecipe(recipeData);
      console.log('Recipe data posted:', recipeData);
    }
  };

  const createRecipe = async (recipeData: any) => {
    try {
      const response = await fetch("/api/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        console.log("Recipe created successfully:", recipeData);
      } else {
        console.error(`Failed to create recipe. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const handleCuisineClick = (selectedCuisine: string) => {
    // Update the cuisine state when a cuisine is clicked
    setCuisine(selectedCuisine);
  };



  //cuisine svgs


  const cuisineIcons: Record<string, JSX.Element> = {
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
    Italian:
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_4_7187)">
          <path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill="#F0F0F0" />
          <path d="M15.0002 7.49981C15.0002 4.27508 12.9649 1.52601 10.1089 0.466309V14.5333C12.9649 13.4736 15.0002 10.7246 15.0002 7.49981V7.49981Z" fill="#D80027" />
          <path d="M0 7.49981C0 10.7246 2.03531 13.4736 4.89132 14.5333V0.466309C2.03531 1.52601 0 4.27508 0 7.49981Z" fill="#6DA544" />
        </g>
        <defs>
          <clipPath id="clip0_4_7187">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>

  };


  return (
    <div className='admin'>
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="file-input">
          <input type='file' onChange={handleFileChange}></input>
          {imageFile && (
            <img width={500} height={300} src={URL.createObjectURL(imageFile)} alt="Selected" />
          )}
        </div>

        <div className='input-div'>
          <h4>Recipe</h4>
          <div className="title">
            <label htmlFor="title">Title</label>
            <input
              name='title'
              id='title'
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            ></input>

          </div>
        </div>
        <div className='ingredients-container'>
          <h4>Ingredients</h4>
          {ingredients.map((ingredient, index) => (
            <div className='ingredient' key={index}>
              <div className="ingredient-name">
                <label htmlFor={`ingredient-name-${index}`}>Name</label>
                <input
                  type="text"
                  id={`ingredient-name-${index}`}
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="ingredient-quantity">
                <label htmlFor={`ingredient-quantity-${index}`}>Quantity</label>
                <input
                  type="text"
                  id={`ingredient-quantity-${index}`}
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                />
              </div>
              <div className="ingredient-unit">
                <label htmlFor={`ingredient-unit-${index}`}>Unit</label>
                <input
                  type="text"
                  id={`ingredient-unit-${index}`}
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                />
              </div>
              {ingredients.length > 1 && (
                <button
                  className='delete-ingredient-btn'
                  type="button"
                  onClick={() => handleDeleteIngredient(index)}
                >
                  <svg width="15" height="18" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 1.75V3H19.25C19.4489 3 19.6397 3.07902 19.7803 3.21967C19.921 3.36032 20 3.55109 20 3.75C20 3.94891 19.921 4.13968 19.7803 4.28033C19.6397 4.42098 19.4489 4.5 19.25 4.5H0.75C0.551088 4.5 0.360322 4.42098 0.21967 4.28033C0.0790175 4.13968 0 3.94891 0 3.75C0 3.55109 0.0790175 3.36032 0.21967 3.21967C0.360322 3.07902 0.551088 3 0.75 3H6V1.75C6 0.784 6.784 0 7.75 0H12.25C13.216 0 14 0.784 14 1.75ZM7.5 1.75V3H12.5V1.75C12.5 1.6837 12.4737 1.62011 12.4268 1.57322C12.3799 1.52634 12.3163 1.5 12.25 1.5H7.75C7.6837 1.5 7.62011 1.52634 7.57322 1.57322C7.52634 1.62011 7.5 1.6837 7.5 1.75ZM2.997 6.178C2.98845 6.07926 2.96041 5.9832 2.91452 5.89536C2.86862 5.80752 2.80576 5.72965 2.72959 5.66625C2.65341 5.60284 2.56542 5.55517 2.47071 5.52598C2.376 5.49678 2.27644 5.48665 2.17779 5.49617C2.07914 5.50568 1.98336 5.53465 1.89597 5.58141C1.80858 5.62817 1.73133 5.69178 1.66868 5.76857C1.60602 5.84536 1.55921 5.93381 1.53095 6.0288C1.50268 6.12379 1.49352 6.22345 1.504 6.322L2.916 20.92C2.95823 21.3527 3.16001 21.7542 3.48203 22.0462C3.80405 22.3383 4.22325 22.5001 4.658 22.5H15.342C15.7769 22.5 16.1962 22.3382 16.5183 22.0459C16.8403 21.7536 17.042 21.3519 17.084 20.919L18.497 6.322C18.5161 6.12388 18.4557 5.9263 18.3291 5.7727C18.2025 5.61911 18.0201 5.5221 17.822 5.503C17.6239 5.4839 17.4263 5.54429 17.2727 5.67088C17.1191 5.79747 17.0221 5.97988 17.003 6.178L15.591 20.774C15.585 20.8359 15.5562 20.8933 15.5102 20.9351C15.4641 20.9769 15.4042 21 15.342 21H4.658C4.59582 21 4.53587 20.9769 4.48983 20.9351C4.44379 20.8933 4.41497 20.8359 4.409 20.774L2.997 6.178Z" fill="#fff" />
                  </svg>
                </button>
              )}
            </div>
          ))}

          <ul className='cuisine-select-menu'>
            <div className='selected-cuisine'>     {cusisine ? <p>{cusisine} </p> : <p>Choose Cuisine</p>}     <svg
              onClick={() => setShowCusines(!showCuisines)}
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
            </svg></div>
            {showCuisines && (
              <div className="options">
                <li onClick={() => { handleCuisineClick('Indian'); setShowCusines(!showCuisines) }}>{cuisineIcons.Indian} Indian</li>
                <li onClick={() => { handleCuisineClick('Spanish'); setShowCusines(!showCuisines) }}>{cuisineIcons.Spanish} Spanish</li>
                <li onClick={() => { handleCuisineClick('French'); setShowCusines(!showCuisines) }}>{cuisineIcons.French} French</li>
                <li onClick={() => { handleCuisineClick('Chinese'); setShowCusines(!showCuisines) }}>{cuisineIcons.Chinese} Chinese</li>
                <li onClick={() => { handleCuisineClick('Italian'); setShowCusines(!showCuisines) }}>{cuisineIcons.Italian} Italian</li>
              </div>
            )}

          </ul>

          <button className='Add-Ingredient-btn' type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
        <button className='create-recipe-btn'>Create Recipe</button>
      </form>
    </div>
  );
}

export default AdminComponent;
