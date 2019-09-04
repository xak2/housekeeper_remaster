const initialState = {
  customers: [],
  staticCustomers: [],
  selected: false
}

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CUSTOMERS':
      return { ...state, customers: action.customers, staticCustomers: action.customers }
    case 'SORT_CUSTOMERS':
      return { ...state, customers: action.customers }
    case 'SELECT_CUSTOMERS':
      return { ...state, selected: action.selected }
    case 'FILTER_CUSTOMERS':
      return { ...state, customers: action.customers }
    default:
      return state
  }
}