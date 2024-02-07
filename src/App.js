import Root from "./page/Root";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "page/Home/Home";
import Cart from "page/Cart/Cart";
import Details from "page/Details/Details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/products/:id" element={<Details/>} />
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
