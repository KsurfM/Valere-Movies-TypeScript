import React, { useEffect } from "react";
import { useState } from "react";

const AppContext = React.createContext<{
  toggleFavourites: (movieId: number) => void;
  favourites: number[];
}>({
  toggleFavourites: (movieId) => {},
  favourites: [],
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  let idArray: number[] = [];

  const toggleFavouritesHandler = (movieId: number) => {
    if (localStorage.getItem("favourites") === null) {
      localStorage.setItem("favourites", movieId.toString());
      idArray.push(Number(movieId));
      setFavourites(idArray);
    } else if (
      localStorage
        .getItem("favourites")!
        .split(",")
        .map((id) => Number(id))
        .includes(movieId)
    ) {
      idArray = localStorage
        .getItem("favourites")!
        .split(",")
        .map((id) => Number(id))
        .filter((id) => id !== movieId)
        .filter((id) => id !== 0);
      setFavourites(idArray);
      localStorage.setItem("favourites", idArray.toString());
    } else {
      idArray = localStorage
        .getItem("favourites")!
        .split(",")
        .map((id) => Number(id))
        .filter((id) => id !== 0);
      idArray.push(movieId);
      setFavourites(idArray);
      localStorage.setItem("favourites", idArray.toString());
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("favourites") !== null &&
      localStorage.getItem("favourites") !== ""
    ) {
      setFavourites(
        localStorage
          .getItem("favourites")!
          .split(",")
          .map((id) => Number(id))
      );
    }
  }, []);

  const contextValue = {
    toggleFavourites: toggleFavouritesHandler,
    favourites: favourites,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
