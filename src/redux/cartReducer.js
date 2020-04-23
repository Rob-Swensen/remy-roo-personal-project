const initialState = {
  cart_count: 0,
};

const GET_CART_COUNT = "GET_CART_COUNT";

export function getCartCount(count) {
  return {
    type: GET_CART_COUNT,
    payload: count,
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CART_COUNT:
      return {
        ...state,
        cart_count: payload,
      };
    default:
      return state;
  }
}
