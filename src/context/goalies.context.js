import React, { useContext, useMemo, useReducer } from 'react';
const GoaliesDataStateContext = React.createContext(undefined);
const GoaliesDataDispatchContext = React.createContext(undefined);
function useGoaliesDataState() {
  const goaliesData = useContext(GoaliesDataStateContext);

  if (goaliesData === undefined) {
    throw new Error(
      'useGoaliesDataState can only be used inside GoaliesDataProvider',
    );
  }

  return goaliesData;
}

function useGoaliesDataDispatch() {
  const goaliesData = useContext(GoaliesDataDispatchContext);

  if (goaliesData === undefined) {
    throw new Error(
      'useGoaliesDataDispatch can only be used inside GoaliesDataProvider',
    );
  }

  return goaliesData;
}

function goaliesDataReducer(state, action) {
  switch (action.type) {
    case 'SET_GOALIES_DATA': {
      return {
        ...state,
        goaliesData: action.payload,
      };
    }

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}

function GoaliesDataProvider({ children }) {
  const [goaliesData, dispatch] = useReducer(goaliesDataReducer, {
    goaliesData: [],
  });

  const memoedGoaliesData = useMemo(() => goaliesData, [goaliesData]);
  const memoedDispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <GoaliesDataStateContext.Provider value={memoedGoaliesData}>
      <GoaliesDataDispatchContext.Provider value={memoedDispatch}>
        {children}
      </GoaliesDataDispatchContext.Provider>
    </GoaliesDataStateContext.Provider>
  );
}

export { GoaliesDataProvider, useGoaliesDataDispatch, useGoaliesDataState };
