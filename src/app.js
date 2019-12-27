import React from 'react';
import ReactTV, { renderOnAppLoaded } from 'react-tv';
import { withNavigation } from 'react-tv-navigation';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
        <Route exact path='/' component={Discover} />
        <Route exact path='/category/:id?' component={Categories} />
        <Route exact path='/channel/:id?' component={Channels} />
        <Route exact path='/follow' component={Following} />
        <Route exact path='/search/:id?' component={Search} />
        <Route exact path='/stream/:channel?' component={Stream} />
      </Switch>
    </Router>
  );
}

const AppWithNavigation = renderOnAppLoaded(withNavigation(App));

ReactTV.render(
  <AppWithNavigation />,
  document.getElementById('app')
);