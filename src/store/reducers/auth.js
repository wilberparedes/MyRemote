import { USER_LOGIN, ATTEMPT, FAILURE, USER_LOGOUT } from "../constants";

const initialState = {
  user: null,
  token: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
        return {
            ...state,
            user: { ...action.payload },
            token: action.payload.token,
        };
    case ATTEMPT:
        return {
            ...state,
            token: null,
        };
    case FAILURE:
        return {
            ...state,
            token: null,
        };
    case USER_LOGOUT:
        return {
            ...state,
            token: null,
            user: null
        };
    default:
      return state;
  }
}
