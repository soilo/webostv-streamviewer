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
import Categories from './Categories';
import Channels from './Channels';
import Following from './Following';
import Search from './Search';
import Stream from './Stream';
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
          exact
          path='/category/:id?'
          render={(routeProps) => <Categories {...routeProps} />} />
        <Route
          exact
          path='/channel/:id?'
          render={(routeProps) => <Channels {...routeProps} />}
        />
        <Route
          exact
          path='/follow'
          render={(routeProps) => <Following {...routeProps} />}
        />
        <Route
          exact
          path='/search/:id?'
          render={(routeProps) => <Search {...routeProps} />}
        />
        <Route
          exact
          path='/stream/:channel?'
          render={(routeProps) => <Stream {...routeProps} />}
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