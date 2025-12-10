import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import type { Appointment, Doctor } from '../types/index'
import '../styles/modal.css'

interface AddAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (appointment: Appointment) => void
  doctors: Doctor[]
}

export default function AddAppointmentModal({
  isOpen,
  onClose,
  onAdd,
  doctors,
}: AddAppointmentModalProps) {
  const [formData, setFormData] = useState<Appointment>({
    doctorId: '',
    doctorName: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
    status: 'scheduled',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'doctorId') {
      const selectedDoctor = doctors.find(d => d._id === value)
      setFormData(prev => ({
        ...prev,
        [name]: value,
        doctorName: selectedDoctor?.name || '',
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.doctorId &&
      formData.patientName &&
      formData.patientEmail &&
      formData.patientPhone &&
      formData.date &&
      formData.time
    ) {
      onAdd(formData)
      setFormData({
        doctorId: '',
        doctorName: '',
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        date: '',
        time: '',
        status: 'scheduled',
        notes: '',
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Appointment</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Doctor *</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} - {doc.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Patient Full Name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Patient Email *</label>
              <input
                type="email"
                name="patientEmail"
                value={formData.patientEmail}
                onChange={handleChange}
                placeholder="patient@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Patient Phone *</label>
              <input
                type="tel"
                name="patientPhone"
                value={formData.patientPhone}
                onChange={handleChange}
                placeholder="+20 123 456 7890"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
