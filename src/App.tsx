import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { VisitorProvider } from './context/VisitorContext';
import VisitorForm from './components/VisitorsForm';
import VisitorList from './components/VisitorList';
import AdminPage from './pages/AdminPage';
import AdminForm from './components/AdminForm';
import { User } from './customerTypes';
import QRCodeGenerator from './components/QRCodeGenerator';
import LoginPage from './pages/LoginPage';
import { generateDummyToken, isAuthenticated, logout } from './auth'; // Import authentication functions

function App() {
  const [user, setUser] = useState<User | null>(null);

  const loggedIn = isAuthenticated();

  useEffect(() => {
    generateDummyToken();
    setUser({ role: 'admin', password: 'your-password-here' });
  }, []);

  return (
    <Router>
      <VisitorProvider>
        <div className="App">
          <h1>Visitor's registration</h1>

          <Routes>
            <Route path="/" element={<VisitorForm />} />
            {!loggedIn && (
              <><Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/register" element={<AdminForm />} />
              <Route path="/admin/visitors" element={<VisitorList />} /></>
            )}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <div>
            {!loggedIn ? (
              <>
                <p>Please log in to access the Admin Portal.</p>
                <Link to="/login">Log In</Link>
              </>
            ) : null}
          </div>
        </div>
      </VisitorProvider>
    </Router>
  );
}

export default App;
