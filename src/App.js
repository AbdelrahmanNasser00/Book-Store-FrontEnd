import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthContext } from "./context/AuthContext";
import ProductPage from "./pages/Books/ProductPage";
import CategoryPage from "./pages/Books/CategoryPage";
import Cart from "./pages/Cart/Cart";

function App() {
  const { currentUser } = useContext(AuthContext);
  const AdminRoute = ({ children }) => {
    if (currentUser && currentUser?.userDetails?.role === "admin") {
      return children;
    } else {
      return <Navigate to="/" replace={true} />;
    }
  };

  const AuthRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" replace={true} />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={<AuthRoute>{/* <Register /> */}</AuthRoute>}
        />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
