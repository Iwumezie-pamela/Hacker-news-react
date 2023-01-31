import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case SET_STORIES:
      return {
        ...state,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
        loading: false,
      };

    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter(
          (storyItem) => storyItem.objectID !== action.payload
        ),
      };

    case HANDLE_SEARCH:
      return { ...state, searchQuery: action.payload, page: 0 };

    case HANDLE_PAGE:
      if (action.payload === "increase") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }

      if (action.payload === "decrease") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
      break;

    default:
      throw new Error(`no matching ${action.type} action type`);
  }
};
export default reducer;
