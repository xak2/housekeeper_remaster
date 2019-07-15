import { loadProgressBar } from 'axios-progress-bar'
import 'nprogress/nprogress.css'

const axios = require('axios');

export function signIn(form) {
  return (dispatch) => {
    dispatch({
      type: 'SIGN_IN_REQUEST',
      user: {
        authenticated: false,
        form: form
      }
    })

    loadProgressBar()
    axios.post(
      'http://localhost/housekeeper/php/Login.php',
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