const initialState = {
  customers: []
}

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CUSTOMERS':
      return { ...state, customers: action.customers }
    default:
      return state
  }
}