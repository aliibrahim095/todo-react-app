import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './views/home/Home';
import InProgress from './views/inprogress/InProgress';
import Completed from './views/completed/Completed';
function App() {
  return (
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
  );
}

export default App;
