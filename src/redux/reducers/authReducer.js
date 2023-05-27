export type RootState = {
  loggedIn: Boolean,
};

const initialState: RootState = {
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        loggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
