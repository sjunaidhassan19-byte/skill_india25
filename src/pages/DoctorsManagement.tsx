import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDoctorStore } from '../hooks/useDoctorStore'
import { FiLogOut, FiCalendar, FiClock, FiUser, FiPhone, FiMail } from 'react-icons/fi'
import type { Appointment } from '../types/index'
import '../styles/pages.css'

export default function DoctorDashboard() {
  const navigate = useNavigate()
  const { doctor, doctorLogout } = useDoctorStore()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all')

  // Mock doctor appointments data
  useEffect(() => {
    if (!doctor) {
      navigate('/doctor-login')
      return
    }

    // Simulate fetching appointments for this doctor
    const mockAppointments: Appointment[] = [
      {
        _id: '1',
        doctorId: doctor._id || '',
        doctorName: doctor.name,
        patientName: 'Ahmed Mohamed',
        patientEmail: 'ahmed.m@email.com',
        patientPhone: '+20 111 222 3333',
        date: '2025-12-15',
        time: '10:00 AM',
        status: 'scheduled',
        notes: 'Regular checkup'
      },
      {
        _id: '2',
        doctorId: doctor._id || '',
        doctorName: doctor.name,
        patientName: 'Fatima Hassan',
        patientEmail: 'fatima.h@email.com',
        patientPhone: '+20 222 333 4444',
        date: '2025-12-15',
        time: '11:30 AM',
        status: 'scheduled',
        notes: 'Follow-up consultation'
      },
      {
        _id: '3',
        doctorId: doctor._id || '',
        doctorName: doctor.name,
        patientName: 'Omar Khan',
        patientEmail: 'omar.k@email.com',
        patientPhone: '+20 333 444 5555',
        date: '2025-12-14',
        time: '02:00 PM',
        status: 'completed',
        notes: 'Previous appointment'
      },
      {
        _id: '4',
        doctorId: doctor._id || '',
        doctorName: doctor.name,
        patientName: 'Layla Ibrahim',
        patientEmail: 'layla.i@email.com',
        patientPhone: '+20 444 555 6666',
        date: '2025-12-16',
        time: '03:30 PM',
        status: 'scheduled',
        notes: 'Initial consultation'
      }
    ]

    setAppointments(mockAppointments)
  }, [doctor, navigate])

  const handleLogout = () => {
    doctorLogout()
    navigate('/doctor-login')
  }

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter)

  const stats = {
    total: appointments.length,
    scheduled: appointments.filter(a => a.status === 'scheduled').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#0066cc'
      case 'completed': return '#28a745'
      case 'cancelled': return '#dc3545'
      default: return '#666'
    }
  }

  if (!doctor) return null

  return (
    <div className="doctor-dashboard">
      {/* Header */}
      <div className="doctor-header">
        <div className="doctor-info">
          <h1>Welcome, {doctor.name}</h1>
          <p className="doctor-specialization">
            <strong>{doctor.specialization}</strong> • {doctor.experience} Years Experience
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>

      {/* Doctor Profile Card */}
      <div className="doctor-profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{doctor.name.split(' ').map(n => n[0]).join('')}</div>
          <div className="profile-info">
            <h2>{doctor.name}</h2>
            <p>{doctor.specialization}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail">
            <FiMail /> {doctor.email}
          </div>
          <div className="detail">
            <FiPhone /> {doctor.phone}
          </div>
          <div className="detail">
            <span>📚 {doctor.experience} years experience</span>
          </div>
        </div>
        {doctor.bio && (
          <div className="profile-bio">
            <p>{doctor.bio}</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
        <div className="stat-card scheduled">
          <div className="stat-value">{stats.scheduled}</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card cancelled">
          <div className="stat-value">{stats.cancelled}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Appointments ({appointments.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'scheduled' ? 'active' : ''}`}
          onClick={() => setFilter('scheduled')}
        >
          Scheduled ({stats.scheduled})
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
        <button 
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>

      {/* Appointments List */}
      <div className="appointments-section">
        <h2>My Appointments</h2>
        {filteredAppointments.length > 0 ? (
          <div className="appointments-grid">
            {filteredAppointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <div className="appointment-header">
                  <div className="status-badge" style={{ backgroundColor: getStatusColor(appointment.status) }}>
                    {appointment.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="patient-info">
                  <h3>
                    <FiUser /> {appointment.patientName}
                  </h3>
                </div>

                <div className="appointment-details">
                  <div className="detail-row">
                    <FiCalendar /> <span>{appointment.date}</span>
                  </div>
                  <div className="detail-row">
                    <FiClock /> <span>{appointment.time}</span>
                  </div>
                  <div className="detail-row">
                    <FiMail /> <span>{appointment.patientEmail}</span>
                  </div>
                  <div className="detail-row">
                    <FiPhone /> <span>{appointment.patientPhone}</span>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="appointment-notes">
                    <strong>Notes:</strong> {appointment.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <p>No appointments found</p>
          </div>
        )}
      </div>
    </div>
  )
}
