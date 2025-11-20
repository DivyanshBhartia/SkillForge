import { Switch, Route } from "wouter";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";

function App() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Landing} />
    </Switch>
  );
}

export default App;