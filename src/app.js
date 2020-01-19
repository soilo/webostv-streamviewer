import React from 'react';
import ReactTV, { renderOnAppLoaded } from 'react-tv';
import { withNavigation } from 'react-tv-navigation';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Navigation from './components/Navigation';
import Player from './components/Player';
import Discover from './views/Discover';
import Games from './views/Games';
import Channels from './views/Channels';
import Following from './views/Following';
import Search from './views/Search';
import Login from './views/Login';
import './app.scss';

const App = ({ currentFocusPath }) => {

  return (
    <Router>
      <Navigation />
      <Redirect from='' exact to='/' />
      <Switch>
        <Route
          exact
          path='/'
          render={(routeProps) => <Discover {...routeProps} />}
        />
        <Route
          path='/login'
          render={(routeProps) => <Login {...routeProps} />}
        />
        <Route
          path='/game/:id?'
          render={(routeProps) => <Games {...routeProps} />}
        />
        <Route
          path='/channel/:id?'
          render={(routeProps) => <Channels {...routeProps} />}
        />
        <Route
          path='/follow'
          render={(routeProps) => <Following {...routeProps} />}
        />
        <Route
          path='/search/:id?'
          render={(routeProps) => <Search {...routeProps} />}
        />
        <Route
          path='/stream/:channel?'
          render={(routeProps) => <Player {...routeProps} />}
        />
      </Switch>
    </Router>
  );
}

const AppWithNavigation = renderOnAppLoaded(withNavigation(App));

ReactTV.render(
  <AppWithNavigation />,
  document.getElementById('app')
);