const SET_TAB_VISIBILITY = "SET_TAB_VISIBILITY";

export const MODULE_NAME = "nav";
export const selectTabVisibility = (state) => state[MODULE_NAME].status;

const initalState = {
    status: false,
};


export function reducer(state = initalState, { type, payload }) {
    switch (type) {
      case SET_TAB_VISIBILITY:
        return {
          status: payload,
        };
      default:
        return state;
    }
  }
export const setTabVisibility = (payload) => ({
  type: SET_TAB_VISIBILITY ,
  payload,
});

export const applyTabVisibility = () => (dispatch) => {
      dispatch(setTabVisibility(false));
};
  