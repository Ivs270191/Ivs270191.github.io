import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";

import MainLayout from "./layouts/MainLayout";

import { lazy, Suspense } from "react";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const ItemDescription = lazy(
  () =>
    import(/* webpackChunkName: "ItemDescription" */ "./pages/ItemDescription")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path=""  element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<p>Идет загрузка...</p>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="Cart"
          element={
            <Suspense fallback={<p>Идет загрузка...</p>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<p>Идет загрузка...</p>}>
              <ItemDescription />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
