// Import React and ReactDOM
// Import Framework7-React Plugin
import Framework7React from 'framework7-react'
// Import Framework7 Styles
import 'framework7/framework7-bundle.css'
// Import Framework7
import Framework7 from 'framework7/lite-bundle'
import React from 'react'
import ReactDOM from 'react-dom'
// Import App Component
import App from '../components/app.jsx'
import '../css/app.scss'
// Import Icons and App Custom Styles
import '../css/icons.css'

// Init F7 React Plugin
Framework7.use(Framework7React)

// Mount React App
ReactDOM.render(React.createElement(App), document.getElementById('app'))
