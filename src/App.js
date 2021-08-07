import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './views/home/Home';
function App() {
  return (
    <Router>
    <Navbar />

    <div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </div>
  </Router>
  );
}

export default App;
