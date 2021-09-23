import './App.css';
import Header from './Header';
import WInfo from './WInfo';
import {BrowserRouter as Router, Route} from "react-router-dom"; 
import Map from "./components/Map.js";

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/map" component={Map} />
        <Route path="/" component={WInfo} />
      </Router>

    </div>
  );
}

export default App;
