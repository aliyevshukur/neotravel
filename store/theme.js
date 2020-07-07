const SET_THEME = "SET_THEME";

export const MODULE_NAME = "theme";
export const selectTheme = (state) => state[MODULE_NAME].theme;

const initalState = {
    theme: "light",
};

export function reducer(state = initalState, { type, payload }) {
    switch (type) {
      case SET_THEME:
        return {
          theme: payload,
        };
      default:
        return state;
    }
  }
export const setTheme = (payload) => ({
  type: SET_THEME ,
  payload,
});

export const applyTheme = () => (dispatch) => {
      dispatch(setTheme(false));
};
  