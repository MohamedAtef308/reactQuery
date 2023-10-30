import React from "react";
import { useGlobalContext } from "./context";

export const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.elements.search.value);
  };

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="cat"
          className="form-input search-input"
        />

        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  );
};
