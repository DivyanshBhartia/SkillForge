import { Switch, Route } from "wouter";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/courses" component={Courses} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Landing} />
    </Switch>
  );
}

export default App;