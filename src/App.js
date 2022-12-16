import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./Layout";
import Hero from "./Hero";
import { Fragment } from "react";
import MovieList from "./MovieList";
import { Switch, Route } from "react-router-dom";
import MovieDiscoveryPage from "./pages/MovieDiscoveryPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import Homepage from "./pages/Homepage";

function App() {
  const API_KEY = "d76141fc516005c4b21c33a7c4f13e2f";

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/discover" exact>
          <MovieDiscoveryPage />
        </Route>
        <Route path="/:movieId" exact>
          <MovieDetailsPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
