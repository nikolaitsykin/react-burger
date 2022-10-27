export const reducer = (state, action) => {
  switch (action.type) {
    case "addTotal":
      return { total: action.payload };
    case "reset":
      return { total: 0 };
    default:
      return state;
  }
};
