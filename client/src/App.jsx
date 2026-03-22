import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoute";
import Feed from "./pages/Feeds";
import Dashboard from "./pages/Dashboard";
import Search from "./components/reels/Search";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            {/* // Customer Routes */}
            <Route
              path="/feed"
              element={
                <ProtectedRoutes role="customer">
                  <Feed />
                </ProtectedRoutes>
              }
            />
            <Route path="/search" element={<Search />} />
            {/* Restaurant Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes role="restaurant">
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
