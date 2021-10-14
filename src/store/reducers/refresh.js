import { PERMISSION_FETCH } from "../constants";

const initialState = {
  permissionsFetch: false,
};

export default function refresh(state = initialState, action) {
  switch (action.type) {
    case PERMISSION_FETCH:
        return {
            ...state,
            permissionsFetch: action.payload.refresh,
        };
    default:
      return state;
  }
}
