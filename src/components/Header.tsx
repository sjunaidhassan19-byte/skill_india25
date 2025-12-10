import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { useUserStore } from '../hooks/useUserStore'
import './Header.css'

export default function Header() {
  const { user, logout } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin-login')
  }

  const getInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase()
    }
    return 'A'
  }

  return (
    <header className="header">
      <div className="header-left">
        <h2>Welcome Back, {user?.username || 'Admin'}</h2>
      </div>
      <div className="header-right">
        <div className="user-profile">
          <div className="avatar">{getInitial()}</div>
          <div className="user-info">
            <div className="user-name">{user?.username || 'Admin'}</div>
            <div className="user-role">{user?.role || 'admin'}</div>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  )
}

