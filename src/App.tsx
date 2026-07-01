import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/Dashboard";
import { currentUser } from "./mockData/DashboardData";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface">
        <Navbar
          userName={currentUser.name}
          pnr={currentUser.pnr}
          onSignOut={() => console.log("sign out")}
        />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;