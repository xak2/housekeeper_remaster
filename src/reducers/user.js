const initialState = {
  user: {
    authenticated: false
  },
  isFetching: false
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return { ...state, user: action.user, isFetching: true }

    case 'SIGN_IN_SUCCESS':
      return { ...state, user: action.user, isFetching: false }

    case 'SIGN_IN_FAILURE':
      return { ...state, user: action.user, isFetching: false }

    case 'SIGN_OUT':
      return { ...state, user: action.user, isFetching: false }

    default:
      return state
  }
}