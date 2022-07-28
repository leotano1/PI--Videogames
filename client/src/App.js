import './App.css';
import { Route } from "react-router-dom";
import Nav from "./components/Nav"
import Home from "./components/Home"
import DetailedGame from "./components/DetailedGame"
import CreateGame from "./components/CreateGame"
import { landingPage } from './components/landingPage';


function App() {


  return (
    <div className="App">
     
      <Route exact path="/" component={landingPage} />
      <Route exact path="/home" component={Nav} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={CreateGame} />
      <Route exact path="/games/:id" component={DetailedGame} />

    </div>
  );
}

export default App;
