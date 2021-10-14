import { TREE_FETCH } from "../constants";

const initialState = {
    tree: null,
};

export default function structures(state = initialState, action) {
  switch (action.type) {
    case TREE_FETCH:
        return {
            ...state,
            tree: action.payload.data.results,
        };
    default:
      return state;
  }
}
