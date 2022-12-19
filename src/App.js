import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import MovieDiscoveryPage from "./pages/MovieDiscoveryPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/discover" element={<MovieDiscoveryPage />} />

        <Route path="/:movieId" element={<MovieDetailsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
