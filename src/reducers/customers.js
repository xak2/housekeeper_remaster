const initialState = {
  customers: [],
  selected: false,
  filter: ''
}

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CUSTOMERS':
      return { ...state, customers: action.customers }
    case 'SORT_CUSTOMERS':
      return { ...state, customers: action.customers }
    case 'SELECT_CUSTOMERS':
      return { ...state, selected: action.selected }
    case 'FILTER_CUSTOMERS':
      return { ...state, filter: action.filter }
    default:
      return state
  }
}