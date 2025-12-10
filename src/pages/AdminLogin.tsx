import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../hooks/useUserStore'
import '../pages/Login.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser, setToken } = useUserStore()

  // Mock admin credentials
  const mockAdmins = [
    { username: 'admin', email: 'admin@mediconnect.com', password: 'admin123' },
    { username: 'super_admin', email: 'superadmin@mediconnect.com', password: 'super123' },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const admin = mockAdmins.find(a => a.email === email && a.password === password)

      if (!admin) {
        setError('Invalid email or password')
        setIsLoading(false)
        return
      }

      // Set user and token
      const userData: any = {
        _id: '1',
        username: admin.username,
        email: admin.email,
        role: admin.username === 'super_admin' ? 'super_admin' : 'admin',
        isActive: true,
        lastLogin: new Date().toISOString(),
      }

      setUser(userData)
      setToken('mock-admin-token-' + Date.now())

      // Navigate to dashboard
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-circle">
          <span>M</span>
        </div>
        <h1>Mediconnect Admin</h1>
        <p className="subtitle">Admin Dashboard</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="divider">OR</div>

        <div className="demo-credentials">
          <p className="demo-title">Demo Admin Credentials:</p>
          <div className="credential">
            <strong>Admin:</strong>
            <div>Email: admin@mediconnect.com</div>
            <div>Password: admin123</div>
          </div>
          <div className="credential">
            <strong>Super Admin:</strong>
            <div>Email: superadmin@mediconnect.com</div>
            <div>Password: super123</div>
          </div>
        </div>

        <p className="doctor-link">
          Doctor? <a href="/doctor-login">Login here</a>
        </p>
      </div>
    </div>
  )
}
