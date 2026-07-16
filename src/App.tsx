import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import Login from "./pages/Login";
import ReviewAlternativeFlightPage from "./pages/ReviewProposedFlight";
import AlternativeFlightConfirmedPage from "./pages/ConfirmedAlternativeFlight";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/alternative-flight" element={<ReviewAlternativeFlightPage />} />
          <Route path="/alternative-flight/confirmed" element={<AlternativeFlightConfirmedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;