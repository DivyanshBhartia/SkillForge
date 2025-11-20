import { Switch, Route } from "wouter";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Courses from "./pages/Courses";

function App() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/courses" component={Courses} />
      <Route path="/" component={Landing} />
    </Switch>
  );
}

export default App;