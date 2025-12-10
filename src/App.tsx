import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'
import Reviews from './pages/Reviews'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import AdminLogin from './pages/AdminLogin'
import DoctorLogin from './pages/Login'
import DoctorDashboard from './pages/DoctorDashboard'
import { useDoctorStore } from './hooks/useDoctorStore'
import { useUserStore } from './hooks/useUserStore'
import type { DoctorStore, UserStore } from './types/index'
import './App.css'

// Protected route for doctor
function DoctorRoute({ children }: { children: React.ReactNode }) {
  const doctorToken = useDoctorStore((state: DoctorStore) => state.token)
  return doctorToken ? <>{children}</> : <Navigate to="/doctor-login" />
}

// Protected route for admin
function AdminRoute({ children }: { children: React.ReactNode }) {
  const adminToken = useUserStore((state: UserStore) => state.token)
  return adminToken ? <>{children}</> : <Navigate to="/admin-login" />
}

// Layout for admin pages
function AdminLayout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Doctor Routes */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route
          path="/doctor/dashboard"
          element={
            <DoctorRoute>
              <DoctorDashboard />
            </DoctorRoute>
          }
        />

        {/* Admin Routes with Protection */}
        <Route
          path="/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
