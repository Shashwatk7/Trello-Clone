import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const LazyHome = lazy(() => import("./Home"));
const LazyDetails = lazy(() => import("./Details"));
const LazyError404 = lazy(() => import("./Incorrect"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/:id/:type" element={<LazyDetails />} />
          <Route path="/notFound" element={<LazyError404 />} />
          <Route path="*" element={<LazyError404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}