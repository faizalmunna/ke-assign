import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import mainReducer from './api/redux/reducers'
import registerServiceWorker from './registerServiceWorker'
import { rootEpic } from './api/redux/epics'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'

const epicMiddleware = createEpicMiddleware(rootEpic)

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(epicMiddleware)))

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
