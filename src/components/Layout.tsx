import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiStar,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut
} from 'react-icons/fi'
import '../styles/layout.css'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/doctors', label: 'Doctors', icon: FiUsers },
    { path: '/appointments', label: 'Appointments', icon: FiCalendar },
    { path: '/reviews', label: 'Reviews', icon: FiStar },
    { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
    { path: '/settings', label: 'Settings', icon: FiSettings }
  ]

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2>Madiconnect</h2>
        </div>
        <nav>
          <ul className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <li key={item.path} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="nav-icon" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            style={{
              width: '80%',
              marginLeft: '10%',
              backgroundColor: '#dc3545',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <div className="top-nav">
          <h1>Madiconnect Admin</h1>
          <div className="user-menu">
            <button
              className="toggle-menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', padding: '0.5rem' }}
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div className="user-avatar">AD</div>
          </div>
        </div>

        {/* Page Content */}
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}
