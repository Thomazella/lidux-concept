export function combineReducers(reducers) {
  return function rootReducer(state, action) {
    const nextState = Object.assign({}, state);
    // redux actions like "@@redux/INIT" don't have payload
    const liduxAction = action.payload ? action : { ...action, payload: {} };

    for (const reducer of reducers) {
      const partialState = reducer(state, liduxAction);
      if (!partialState) {
        continue;
      }
      console.log("new state", partialState);
      Object.assign(nextState, partialState);
    }
    return nextState;
  };
}

export function reducerFrom(type, handler, initialState) {
  return function reducer(state = initialState, action) {
    if (action.type === "@@redux/INIT") {
      return initialState;
    }
    if (action.type !== type) {
      return;
    }
    const picked = Object.keys(initialState).reduce((acc, key) => {
      Object.assign(acc, { [key]: state[key] });
      return acc;
    }, {});

    return handler(picked, action.payload);
  };
}
