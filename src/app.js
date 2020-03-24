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

const App = () => {
  return (
    <Router>
      <Navigation />
      <Redirect from='' exact to='/discover' />
      <Switch>
        <Route exact path='/discover' render={() => <Discover />} />
        <Route path='/login' render={() => <Login />} />
        <Route
          path='/game/:id?'
          render={(routeProps) => <Games match={routeProps.match} />}
        />
        <Route path='/channel/:id?' render={() => <Channels />} />
        <Route path='/follow' render={() => <Following />} />
        <Route path='/search/:id?' render={() => <Search />} />
        <Route
          path='/stream/:channel'
          render={(routeProps) => <Player channel={routeProps.channel} />}
        />
        <Route
          path='/video/:video'
          render={(routeProps) => <Player video={routeProps.video} />}
        />
      </Switch>
    </Router>
  );
};

const AppWithNavigation = renderOnAppLoaded(withNavigation(App));

ReactTV.render(<AppWithNavigation />, document.getElementById('app'));
