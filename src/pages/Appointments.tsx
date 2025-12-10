import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import AddAppointmentModal from '../components/AddAppointmentModal'
import { useUserStore } from '../hooks/useUserStore'
import type { Appointment } from '../types/index'
import './Pages.css'

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { appointments, doctors, addAppointment, deleteAppointment } = useUserStore()

  const filteredAppointments = appointments.filter(apt =>
    apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'badge-info'
      case 'completed':
        return 'badge-success'
      case 'cancelled':
        return 'badge-danger'
      default:
        return 'badge-warning'
    }
  }

  const handleAddAppointment = (appointment: Appointment) => {
    addAppointment(appointment)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Appointments</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> New Appointment
        </button>
      </div>

      <div className="search-bar">
        <FiSearch />
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(apt => (
                <tr key={apt._id}>
                  <td>
                    <strong>{apt.doctorName}</strong>
                  </td>
                  <td>{apt.patientName}</td>
                  <td>{apt.patientEmail}</td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td>
                    <span className={`badge ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn btn-sm btn-info">
                      <FiEdit2 />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => apt._id && deleteAppointment(apt._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddAppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddAppointment}
        doctors={doctors}
      />
    </div>
  )
}
