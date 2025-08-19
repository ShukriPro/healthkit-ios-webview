import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookingPage from './booking/BookingPage';
import HealthPages from './health/HealthPages';
import BottomNavigationComponent from './components/BottomNavigationComponent';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <div className="flex-fill pb-5">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HealthPages />} />
            <Route path="/appointments" element={<BookingPage />} />
            <Route path="/chat" element={<div className="p-4">Chat Page - Coming Soon</div>} />
            <Route path="/calls" element={<div className="p-4">Calls Page - Coming Soon</div>} />
            <Route path="/more" element={<div className="p-4">More Page - Coming Soon</div>} />
          </Routes>
        </div>
        <BottomNavigationComponent />
      </div>
    </Router>
  );
}

export default App;
