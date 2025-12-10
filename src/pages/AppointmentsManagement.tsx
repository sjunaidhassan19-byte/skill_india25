import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiClock } from 'react-icons/fi'
import '../styles/pages.css'

interface Appointment {
  id: string
  doctorName: string
  patientName: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Ahmed Hassan',
      patientName: 'Mohammed Ali',
      date: '2025-12-15',
      time: '10:00 AM',
      status: 'scheduled'
    },
    {
      id: '2',
      doctorName: 'Dr. Fatima Ali',
      patientName: 'Sara Mohamed',
      date: '2025-12-15',
      time: '2:00 PM',
      status: 'scheduled'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id))
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Appointments Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <FiPlus /> New Appointment
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Schedule Appointment</h3>
          <form className="form-grid">
            <select required>
              <option value="">Select Doctor</option>
              <option value="dr-ahmed">Dr. Ahmed Hassan</option>
              <option value="dr-fatima">Dr. Fatima Ali</option>
            </select>
            <input type="text" placeholder="Patient Name" required />
            <input type="date" required />
            <input type="time" required />
            <select required>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Schedule</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="search-box">
        <FiSearch />
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((apt) => (
              <tr key={apt.id}>
                <td><strong>{apt.doctorName}</strong></td>
                <td>{apt.patientName}</td>
                <td>{apt.date}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiClock size={16} />
                    {apt.time}
                  </div>
                </td>
                <td>
                  <span className={`badge badge-${apt.status}`}>
                    {apt.status}
                  </span>
                </td>
                <td>
                  <button className="btn-icon" title="Edit">
                    <FiEdit2 />
                  </button>
                  <button
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(apt.id)}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
