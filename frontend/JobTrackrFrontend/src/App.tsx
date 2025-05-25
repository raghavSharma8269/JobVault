import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFoundPage from "./pages/error/NotFoundPage.tsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.tsx";
import EmailVerifiedPage from "./pages/EmailVerifiedPage.tsx";

function App() {
  return (
    <div style={{ backgroundColor: "#1c1d26", minHeight: "100vh" }}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/verify" element={<EmailVerificationPage />} />
        <Route path="/verify-status" element={<EmailVerifiedPage />} />
      </Routes>
    </div>
  );
}

export default App;
