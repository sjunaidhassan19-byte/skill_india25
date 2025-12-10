import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import type { Doctor } from '../types/index'
import '../styles/modal.css'

interface AddDoctorModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (doctor: Doctor) => void
}

export default function AddDoctorModal({ isOpen, onClose, onAdd }: AddDoctorModalProps) {
  const [formData, setFormData] = useState<Doctor>({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: 0,
    status: 'active',
    bio: '',
    qualifications: [],
  })

  const [qualificationInput, setQualificationInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) : value,
    }))
  }

  const handleAddQualification = () => {
    if (qualificationInput.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...(prev.qualifications || []), qualificationInput],
      }))
      setQualificationInput('')
    }
  }

  const handleRemoveQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: (prev.qualifications || []).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.phone && formData.specialization) {
      onAdd(formData)
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        experience: 0,
        status: 'active',
        bio: '',
        qualifications: [],
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Doctor</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. Full Name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@mediconnect.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+20 123 456 7890"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Specialization *</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <option value="">Select Specialization</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="General Practice">General Practice</option>
              </select>
            </div>
            <div className="form-group">
              <label>Years of Experience *</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="10"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Short biography..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Qualifications</label>
            <div className="qualification-input">
              <input
                type="text"
                value={qualificationInput}
                onChange={(e) => setQualificationInput(e.target.value)}
                placeholder="e.g., MD, Board Certified"
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddQualification}
              >
                Add
              </button>
            </div>
            {formData.qualifications && formData.qualifications.length > 0 && (
              <div className="qualification-list">
                {formData.qualifications.map((q, idx) => (
                  <div key={idx} className="qualification-tag">
                    {q}
                    <button
                      type="button"
                      onClick={() => handleRemoveQualification(idx)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
