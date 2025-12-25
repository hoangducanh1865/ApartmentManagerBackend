import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './app/components/Layout';
import Login from './app/login/page';
import Register from './app/register/page';
import ResidentDashboard from './app/(dashboard)/resident/page';
import FeeList from './app/(dashboard)/list/fees/page';
import PaymentHistory from './app/(dashboard)/list/history/page';
import ResidentProfile from './app/(dashboard)/profile/page';
import AdminDashboard from './app/(dashboard)/admin/page';
import HouseholdManager from './app/(dashboard)/list/households/page';
import ResidentManager from './app/(dashboard)/list/residents/page';
import RequestManager from './app/(dashboard)/list/requests/page';
import FeeManager from './app/(dashboard)/admin/fees/page';
import InvoiceManager from './app/(dashboard)/list/invoices/page';
import RegistrationManager from './app/(dashboard)/list/registrations/page';
import ResidentRegistration from './app/(dashboard)/owner/page';
import { User, Role } from './types';
import { getCurrentUser, logout } from './lib/authService';

interface ProtectedRouteProps {
  user: User | null;
  allowedRoles: Role[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, allowedRoles, children }) => {
  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Đang tải...</div>;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={
            user ? (
              <Navigate to={user.role === Role.ADMIN ? "/admin/dashboard" : "/resident/dashboard"} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          <Route path="/login" element={
            user ? (
              <Navigate to={user.role === Role.ADMIN ? "/admin/dashboard" : "/resident/dashboard"} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
          <Route path="/register" element={<Register />} />

          {/* Resident Routes */}
          <Route
            path="/resident/dashboard"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.RESIDENT]}>
                <ResidentDashboard user={user!} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/fees"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.RESIDENT]}>
                <FeeList user={user!} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/history"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.RESIDENT]}>
                <PaymentHistory user={user!} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/registrations"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.RESIDENT]}>
                <ResidentRegistration user={user!} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/profile"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.RESIDENT]}>
                <ResidentProfile user={user!} />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/households"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.ADMIN]}>
                <HouseholdManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/residents"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.ADMIN]}>
                <ResidentManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/fees"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.ADMIN]}>
                <FeeManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/invoices"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.ADMIN]}>
                <InvoiceManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.ADMIN]}>
                <RegistrationManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute user={user} allowedRoles={[Role.ADMIN]}>
                <RequestManager />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
