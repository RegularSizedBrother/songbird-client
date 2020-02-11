import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TwitterPage } from './pages/Twitter';
import { AttributesPage } from './pages/Attributes';
import { PlaylistPage } from './pages/Playlist';
import { ErrorPage } from './pages/Error';

function App() {
  return(
    <div>
      <Switch>
        <Route path='/playlist/:id' component={PlaylistPage} />
        <Route path='/attributes/:id' component={AttributesPage} />
        <Route path='/error' component={ErrorPage} />
        <Route path='/' component={TwitterPage} />
      </Switch>
    </div>
  );
}

export default App;
