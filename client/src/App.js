import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Map from "./Map";
import Home from "./Home";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  let history = useHistory();

  // auto log in
  function auth() {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json()
          .then((user) => setUser(user))
          .then(() => {
            history.push("/home");
          });
      }
    });
  }

  useEffect(auth, []);

  // VV this messes with the routing
  if (!user) return <LoginForm />;

  return (
    <Switch>
      <Route exact path="/">
        <LoginForm user={user} setUser={setUser} />
      </Route>
      <Route path="/signup">
        <SignupForm user={user} setUser={setUser} />
      </Route>
      <Route path="/map">
        <Map />
      </Route>
      <Route path="/home">
        <Home user={user} setUser={setUser} />
      </Route>
      <Route path="/goodbye">goodbye</Route>
    </Switch>
  );
}

export default App;
