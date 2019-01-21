import React, { Component } from 'react';
import {PlayerCreationContainer} from './PlayerManagement/PlayerCreationContainer'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Rise and shine Mr. Vogel, rise and shine...
          </p>
          <PlayerCreationContainer />
        </header>
      </div>
    );
  }
}

export default App;
