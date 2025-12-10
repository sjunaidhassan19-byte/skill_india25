import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiUsers, FiCalendar, FiStar, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi'
import './Sidebar.css'

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/doctors', label: 'Doctors', icon: FiUsers },
    { path: '/appointments', label: 'Appointments', icon: FiCalendar },
    { path: '/reviews', label: 'Reviews', icon: FiStar },
    { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
    { path: '/settings', label: 'Settings', icon: FiSettings }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Madiconnect</h1>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
