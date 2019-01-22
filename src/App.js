import React, { Component } from 'react';
import {PlayerCreationContainer} from './PlayerManagement/PlayerCreationContainer';
import {PlayerListContainer} from './PlayerManagement/PlayerListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Rise and shine Mr. Vogel, rise and shine...
          </p>
          <PlayerCreationContainer />
          <PlayerListContainer />
        </header>
      </div>
    );
  }
}

export default App;
