import _ from "lodash";
import { GET_POSTS, GET_POST, DELETE_POST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case GET_POST:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case DELETE_POST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
