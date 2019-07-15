export function signIn(status) {
  return {
    type: 'SIGN_IN',
    user: {
      status: status
    }
  }
}

export function signOut(status) {
  return {
    type: 'SIGN_OUT',
    status
  }
}