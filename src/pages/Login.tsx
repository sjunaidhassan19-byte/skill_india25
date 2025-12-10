import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDoctorStore } from '../hooks/useDoctorStore'
import './Login.css'

export default function DoctorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { doctorLogin, isLoading } = useDoctorStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    try {
      await doctorLogin(email, password)
      navigate('/doctor/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-circle">
            <span className="logo-text">MC</span>
          </div>
          <h1>Mediconnect</h1>
          <p className="subtitle">Doctor Portal</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="your.email@mediconnect.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-info">
          <p className="demo-title">Demo Credentials:</p>
          <div className="demo-credentials">
            <p>📧 <strong>ahmed@mediconnect.com</strong></p>
            <p>📧 <strong>fatima@mediconnect.com</strong></p>
            <p>📧 <strong>omar@mediconnect.com</strong></p>
            <p className="note">(Any password will work for demo)</p>
          </div>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <a href="#signup">Contact Admin</a></p>
        </div>
      </div>
    </div>
  )
}
