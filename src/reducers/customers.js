const initialState = {
  customers: [],
  selected: false
}

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CUSTOMERS':
      return { ...state, customers: action.customers }
    case 'SORT_CUSTOMERS':
      return { ...state, customers: action.customers }
    case 'SELECT_CUSTOMERS':
      return { ...state, selected: action.selected }
    default:
      return state
  }
}