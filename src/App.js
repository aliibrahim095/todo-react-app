import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './views/home/Home';
import InProgress from './views/inprogress/InProgress';
import Completed from './views/completed/Completed';

export const CounterContext = React.createContext();

function App() {
  const [counter,setCounter]=useState(0)
  const counterObj={counter,setCounter};
  return (
    <CounterContext.Provider value={counterObj}>
    <Router>
    <Navbar />

    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/inprogress">
          <InProgress />
        </Route>
        <Route path="/completed">
          <Completed />
        </Route>

      </Switch>
    </div>
  </Router>
  </CounterContext.Provider>
  );
}

export default App;
