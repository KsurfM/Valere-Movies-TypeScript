import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import MovieDiscoveryPage from "./pages/MovieDiscoveryPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/discover" element={<MovieDiscoveryPage />} />

        <Route path="/:movieId" element={<MovieDetailsPage />} />

        <Route path="/404" element={<PageNotFound />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
