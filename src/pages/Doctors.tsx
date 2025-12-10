import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import AddDoctorModal from '../components/AddDoctorModal'
import { useUserStore } from '../hooks/useUserStore'
import type { Doctor } from '../types/index'
import './Pages.css'

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { doctors, addDoctor, deleteDoctor } = useUserStore()

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddDoctor = (doctor: Doctor) => {
    addDoctor(doctor)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Doctors Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Doctor
        </button>
      </div>

      <div className="search-bar">
        <FiSearch />
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <tr key={doctor._id}>
                  <td><strong>{doctor.name}</strong></td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.experience} years</td>
                  <td>
                    <span className={`status-badge status-${doctor.status}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn btn-sm btn-info">
                      <FiEdit2 />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => doctor._id && deleteDoctor(doctor._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddDoctorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddDoctor}
      />
    </div>
  )
}

