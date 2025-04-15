import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CanvasEditor from "./component/CanvasEditor";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="header">
            <h1>Imagify - Fabric.js Editor</h1>
            <p className="user-info">
              Name: Rahul Kumar | Email:rahulgadi21111999@gmail.com
            </p>
          </div>
          <Home />
        </Route>
        <Route path="/imageedit">
          <div className="header">
            <h1>Imagify - Fabric.js Editor</h1>
            <p className="user-info">
              Name: Rahul Kumar | Email:rahulgadi21111999@gmail.com
            </p>
          </div>
          <CanvasEditor />
        </Route>
      </Switch>
    </Router>
  );
}
