import React from 'react';
import Main from './Components/Dashboard/Main.js';
import Landing from './Components/LandingPage/Landing.js';
import './App.css';

function App() {
  var isSignedIn = false;
  return (
    <div>
      <section>
        {isSignedIn ? <Main /> : <Landing />}
      </section>

    </div>
  );
}

export default App;
