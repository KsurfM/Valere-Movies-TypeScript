import React from "react";
import { useState } from "react";

const AppContext = React.createContext({
  toggleFavourites: () => {},
});

export const AppContextProvier = (props) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavouritesHandler = () => {
    setIsFavourite((prevState) => !prevState);
    if (!localStorage.getItem(props.id)) {
      localStorage.setItem(`${props.id}`, true);
    } else {
      localStorage.removeItem(`${props.id}`);
    }
  };

  const contextValue = {
    toggleFavourites: toggleFavouritesHandler,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
