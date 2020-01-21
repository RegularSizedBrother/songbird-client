import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TwitterPage from './TwitterPage';
import ResultsPage from './ResultsPage';
import PlaylistPage from './PlaylistPage';

function App() {
  return(
    <div>
      <Switch>
        <Route path='/playlist'>
          <PlaylistPage />
        </Route>
        <Route path='/results/:username' component={ResultsPage} />
        <Route path='/'>
          <TwitterPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
