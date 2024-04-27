import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import PersonalArea from "./pages/PersonalArea/PersonalArea";
import Site from "./pages/Site/Site";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const [color, setColor] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const location = useLocation();

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll();
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        localStorage.removeItem("data_register");
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        setIsAuthenticated(false);
      }, 900000);
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <Site
              setColor={setColor}
              color={color}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="dashboard/*"
          element={
            isAuthenticated ? (
              <PersonalArea
                color={color}
                isAuthenticated={isAuthenticated}
                setColor={setColor}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate
                to="/login"
                replace
                state={{ from: window.location.pathname }}
              />
            )
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
