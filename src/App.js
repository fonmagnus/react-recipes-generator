import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState("chicken");

  // Use Effect runs each time the page renders the firsst time
  // After something re-rendered on our page, this also gonna runs
  // The second argumets means that this function will be run each time
  // any of the elements inside those arguments are re-rendered
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearchValue = (e) => {
    console.log(process.env);
    setSearchValue(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(searchValue);
    setSearchValue("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={searchValue}
          onChange={updateSearchValue}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
