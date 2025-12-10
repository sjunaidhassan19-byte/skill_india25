import { useState } from 'react'
import './Pages.css'

export default function Settings() {
  const [settings, setSettings] = useState({
    clinicName: 'Madiconnect Clinic',
    email: 'admin@madiconnect.com',
    phone: '+20 123 456 7890',
    address: 'Cairo, Egypt',
    timezone: 'Africa/Cairo',
    language: 'ar'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Settings saved:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <div className="page">
      <h1>System Settings</h1>

      <div className="settings-container">
        <form onSubmit={handleSubmit}>
          <div className="settings-section">
            <h3>Clinic Information</h3>
            <div className="form-grid">
              <input
                type="text"
                name="clinicName"
                placeholder="Clinic Name"
                value={settings.clinicName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={settings.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={settings.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={settings.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="settings-section">
            <h3>Preferences</h3>
            <div className="form-grid">
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
              >
                <option value="Africa/Cairo">Africa/Cairo (UTC+2)</option>
                <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
              </select>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary">Save Settings</button>
            <button type="button" className="btn btn-secondary">Reset to Default</button>
          </div>
        </form>
      </div>
    </div>
  )
}
