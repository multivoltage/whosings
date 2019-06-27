import React, { Component } from 'react'
import reduxstore from './core/reduxstore'
import { Provider } from 'react-redux'
import { Switch, Route, HashRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Main from './core/components/Main/Main'
import history from './core/history'
import './App.scss'

import HeaderWrapper from './core/components/Header/HeaderWrapper'
import LoginLayerWrapper from './core/components/LoginLayer/LoginLayerWrapper'
import QuizPageWrapper from './core/components/QuizPage/QuizPageWrapper'
import ProfilePageWrapper from './core/components/ProfilePage/ProfilePageWrapper'
import StatsPageWrapper from './core/components/StatsPage/StatsPageWrapper'

class App extends Component {
  render() {
    return (
      <Provider store={reduxstore}>
        <HashRouter>
          <div>
            <HeaderWrapper />
            <LoginLayerWrapper />
            <Switch>
              {/* <Route exact path="/" component={Main} /> */}
              <Route exact path="/quiz" component={QuizPageWrapper} />
              <Route exact path="/profile" component={ProfilePageWrapper} />
              <Route exact path="/stats" component={StatsPageWrapper} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    )
  }
}

export default App
