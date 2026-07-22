import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import Login from "./pages/Login";
import ReviewAlternativeFlightPage from "./pages/ReviewProposedFlight";
import AlternativeFlightConfirmedPage from "./pages/ConfirmedAlternativeFlight";
import { currentUser } from "./mockData/DashboardData";
import Navbar from "./components/Navbar";
import { RebookOptions } from "./pages/RebookFlight";
import ReviewSelectedFlightPage from "./pages/ReviewSelectedFlight";
import RebookingConfirmed from "./pages/RebookingConfirmed";

function App() {
  const location = useLocation();
  const navigate = useNavigate()
 const hideHeadbar = ["/"];
 const shouldHideHeadbar = !hideHeadbar.includes(location.pathname);

  return (
    <div>
      <div className="min-h-screen bg-surface">

      <main className="flex-1 px-2.5 py-1 flex flex-col gap-2">
        {
          shouldHideHeadbar && <Navbar
                  userName={currentUser.name}
                  pnr={currentUser.pnr}
                  onSignOut={() => navigate("/login")}
                />
        }
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/alternative-flight" element={<ReviewAlternativeFlightPage />} />
          <Route path="/alternative-flight/confirmed" element={<AlternativeFlightConfirmedPage />} />
          <Route path="/rebook" element={<RebookOptions />} />
          <Route path="/rebook/:flightId" element={<ReviewSelectedFlightPage />} />
          <Route path="/rebook/:flightId/confirmed" element={<RebookingConfirmed />} />
        </Routes>
      </main>
      </div>
    </div>
  );
}

export default App;