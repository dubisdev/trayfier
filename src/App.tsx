import { Home } from "./routes/Home";
import { Router, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { CreateTrayApp } from "./routes/CreateTrayApp";
import { Routes } from "./routes/Routes";
import { EditTrayApp } from "./routes/EditTrayApp";

const App = () => (
  <Router hook={useHashLocation}>
    <Route path={Routes.HOME} component={Home} />
    <Route path={Routes.CREATE_TRAY_APP} component={CreateTrayApp} />
    <Route path={Routes.EDIT_TRAY_APP} component={EditTrayApp} />
  </Router>
);

export default App;
