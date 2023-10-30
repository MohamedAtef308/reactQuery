import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const apiKey = import.meta.env.VITE_API_KEY;

const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}`;

export const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  const photosResponse = useQuery({
    queryKey: ["photos", `${searchTerm}`],
    queryFn: async () => await axios.get(`${url}&query=${searchTerm}`),
  });

  if (photosResponse.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>;
      </section>
    );
  }

  if (photosResponse.isError) {
    return (
      <section className="image-container">
        <h4>Error!</h4>;
      </section>
    );
  }

  const photos = photosResponse.data.data.results;

  if (photos < 1) {
    return (
      <section className="image-container">
        <h4>No Results Found</h4>;
      </section>
    );
  }

  return (
    <section className="image-container">
      {photos.map((photo) => {
        return (
          <img
            src={photo?.urls?.regular}
            key={photo?.id}
            alt={photo?.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};
