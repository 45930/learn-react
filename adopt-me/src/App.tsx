import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Adopt Me!</h1>
        <Routes>
          <Route path="/details/:id" element={<PetDetail />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(React.createElement(App));
