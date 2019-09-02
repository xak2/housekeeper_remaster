import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import 'nprogress/nprogress.css'

const axiosWithProgress = axios.create()
loadProgressBar({}, axiosWithProgress)

export function signIn(form) {
  return (dispatch) => {
    dispatch({
      type: 'SIGN_IN_REQUEST',
      user: {
        authenticated: false,
        form: form
      }
    })

    axiosWithProgress.post(
      'http://localhost/housekeeper_remaster/php/Login.php',
      { login: form.login, password: form.password },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then(function (response) {
      console.log(response)
      if (response.data.authenticated === true) {
        dispatch({
          type: 'SIGN_IN_SUCCESS',
          user: response.data
        })
      } else {
        dispatch({
          type: 'SIGN_IN_FAILURE',
          user: {
            authenticated: false,
            error: true,
            error_message: response.data.message
          }
        })
      }
    }).catch(function (error) {
      dispatch({
        type: 'SIGN_IN_FAILURE',
        user: {
          authenticated: false,
          error: true,
          error_message: error.message
        }
      })
    })
  }
}

export function signOut() {
  return {
    type: 'SIGN_OUT',
    user: {
      authenticated: false
    }
  }
}

export function sortCustomers(customers) {
  return (dispatch) => {
    dispatch({
      type: 'SORT_CUSTOMERS',
      customers: customers
    })
  }
}

export function setSelectedCustomers(selected) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_CUSTOMERS',
      selected: selected
    })
  }
}

export function loadCustomers() {
  return (dispatch) => {
    axiosWithProgress.get(`http://localhost/housekeeper_remaster/php/LoadCustomers.php`)
      .then(r => {
        const customers = r.data.customers
        dispatch({
          type: 'LOAD_CUSTOMERS',
          customers: customers
        })
      })
  }
}