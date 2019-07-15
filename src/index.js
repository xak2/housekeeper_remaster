import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'

import { Customizer, mergeStyles } from 'office-ui-fabric-react'
import { initializeIcons } from '@uifabric/icons'
import './media/index.css'

initializeIcons()

mergeStyles({selectors: {':global(body), :global(html), :global(#root)': {margin: 0, padding: 0, height: '100vh'}}})

ReactDOM.render(
  <Provider store={store}>
    <Customizer>
      <App />
    </Customizer>
  </Provider>,
  document.getElementById('root')
)