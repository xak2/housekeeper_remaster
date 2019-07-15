const SignIn = (state = [], action) => {
  console.log('Response from reducer:')
  console.log(action);
  switch (action.type) {
    case 'SIGN_IN':
      return [
        ...state,
        { user: { status: action.status } }
      ]
    default:
      return state
  }
}

export default SignIn