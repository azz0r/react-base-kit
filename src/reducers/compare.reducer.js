const initialState = false;

export const setCompareReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPARE':
      return action.compare;
    default:
      return state;
  }
};
