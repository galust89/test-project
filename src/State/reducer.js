import {
    GET_CODE,
    GET_DATA,
  } from "./types";
  
  const initialState = {
    success: false
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case GET_DATA: {
        return {
          ...state,
          ...action.response
        };
      }
      case GET_CODE: {
        return {
          ...state,
          ...action.response
        };
      }
      default:
        return state;
    }
  };
  
  export { reducer, initialState };