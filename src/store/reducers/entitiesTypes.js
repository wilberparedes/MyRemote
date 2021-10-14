import { ENTITIES_TYPES_FETCH } from "../constants";

const initialState = {
	data: null
};
export default function entitiesTypes(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_TYPES_FETCH:
        return {
          ...state,
          data: action.payload.data.data,
        };
    default:
      return state;
  }
}
