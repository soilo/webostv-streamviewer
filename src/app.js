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
import Discover from './Discover';
import Games from './Games';
import Channels from './Channels';
import Following from './Following';
import Search from './Search';
import Video from './components/Video';
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
          path='/game/:id?'
          render={(routeProps) => <Games {...routeProps} />} />
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
          render={(routeProps) => <Video {...routeProps} />}
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