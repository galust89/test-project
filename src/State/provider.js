import React, { useContext, createContext, useReducer } from "react";

import { reducer, initialState } from "./reducer";

const ContextStateProvider = createContext();
const ContextDispatchProvider = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextStateProvider.Provider value={state}>
      <ContextDispatchProvider.Provider value={dispatch}>
        {children}
      </ContextDispatchProvider.Provider>
    </ContextStateProvider.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(ContextStateProvider);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a Provider"
    );
  }
  return context;
};

const useDispatchContext = () => {
  const context = useContext(ContextDispatchProvider);
  if (!context) {
    throw new Error(
      "useDispatchContext must be used within a Provider"
    );
  }
  return context;
};

export {
  Provider,
  useStateContext,
  useDispatchContext,
};