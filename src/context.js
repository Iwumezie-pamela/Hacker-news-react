import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const AppContext = React.createContext();

const initialState = {
  loading: true,
  hits: [], //or hits from the api
  searchQuery: "React",
  page: 0,
  nbPages: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories(
      `${API_ENDPOINT}query=${state.searchQuery}&page=${state.page}`
    );
    // eslint-disable-next-line
  }, [state.searchQuery, state.page]);

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  const handleSearch = (searchQuery) => {
    dispatch({ type: HANDLE_SEARCH, payload: searchQuery });
  };

  const handlePage = (value) => {
    //value is either increase or decrease
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
