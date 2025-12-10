import { create } from 'zustand'
import type { UserStore, Admin, Doctor, Appointment } from '../types/index'
import { authAPI } from '../services/api'

// Mock data
const mockDoctors: Doctor[] = [
  {
    _id: '1',
    name: 'Dr. Ahmed Hassan',
    specialization: 'Cardiology',
    email: 'ahmed@mediconnect.com',
    phone: '+20 123 456 7890',
    experience: 10,
    status: 'active',
    bio: 'Experienced cardiologist with 10 years of practice',
    qualifications: ['MD', 'Board Certified Cardiology'],
  },
  {
    _id: '2',
    name: 'Dr. Fatima Ali',
    specialization: 'Pediatrics',
    email: 'fatima@mediconnect.com',
    phone: '+20 234 567 8901',
    experience: 8,
    status: 'active',
    bio: 'Specialized in child health and development',
    qualifications: ['MD', 'Board Certified Pediatrics'],
  },
  {
    _id: '3',
    name: 'Dr. Omar Khan',
    specialization: 'Neurology',
    email: 'omar@mediconnect.com',
    phone: '+20 345 678 9012',
    experience: 12,
    status: 'active',
    bio: 'Expert in neurological disorders',
    qualifications: ['MD', 'PhD Neurology', 'Board Certified Neurology'],
  },
]

const mockAppointments: Appointment[] = [
  {
    _id: '1',
    doctorId: '1',
    doctorName: 'Dr. Ahmed Hassan',
    patientName: 'Ahmed Mohamed',
    patientEmail: 'ahmed.patient@gmail.com',
    patientPhone: '+20 500 123 4567',
    date: '2025-12-15',
    time: '10:00',
    status: 'scheduled',
    notes: 'Follow-up for heart condition',
  },
  {
    _id: '2',
    doctorId: '2',
    doctorName: 'Dr. Fatima Ali',
    patientName: 'Fatima Hassan',
    patientEmail: 'fatima.patient@gmail.com',
    patientPhone: '+20 500 234 5678',
    date: '2025-12-16',
    time: '14:00',
    status: 'scheduled',
    notes: 'Pediatric checkup',
  },
  {
    _id: '3',
    doctorId: '3',
    doctorName: 'Dr. Omar Khan',
    patientName: 'Omar Ali',
    patientEmail: 'omar.patient@gmail.com',
    patientPhone: '+20 500 345 6789',
    date: '2025-12-17',
    time: '11:30',
    status: 'completed',
    notes: 'Neurology consultation',
  },
]

export const useUserStore = create<UserStore>((set, get) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  token: localStorage.getItem('authToken') || null,
  isLoading: false,
  doctors: JSON.parse(localStorage.getItem('doctors') || JSON.stringify(mockDoctors)),
  appointments: JSON.parse(localStorage.getItem('appointments') || JSON.stringify(mockAppointments)),

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await authAPI.login({ email, password })
      const { data, token } = response.data

      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(data))

      set({ user: data, token, isLoading: false })
    } catch (error: any) {
      set({ isLoading: false })
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },

  setUser: (user: Admin) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },

  setToken: (token: string) => {
    localStorage.setItem('authToken', token)
    set({ token })
  },

  addDoctor: (doctor: Doctor) => {
    const newDoctor = {
      ...doctor,
      _id: doctor._id || String(Date.now()),
      status: doctor.status || 'active',
    }
    const doctors = [...get().doctors, newDoctor]
    localStorage.setItem('doctors', JSON.stringify(doctors))
    set({ doctors })
  },

  updateDoctor: (id: string, doctor: Partial<Doctor>) => {
    const doctors = get().doctors.map(d => (d._id === id ? { ...d, ...doctor } : d))
    localStorage.setItem('doctors', JSON.stringify(doctors))
    set({ doctors })
  },

  deleteDoctor: (id: string) => {
    const doctors = get().doctors.filter(d => d._id !== id)
    localStorage.setItem('doctors', JSON.stringify(doctors))
    set({ doctors })
  },

  addAppointment: (appointment: Appointment) => {
    const newAppointment = {
      ...appointment,
      _id: appointment._id || String(Date.now()),
      status: appointment.status || 'scheduled',
    }
    const appointments = [...get().appointments, newAppointment]
    localStorage.setItem('appointments', JSON.stringify(appointments))
    set({ appointments })
  },

  updateAppointment: (id: string, appointment: Partial<Appointment>) => {
    const appointments = get().appointments.map(a =>
      a._id === id ? { ...a, ...appointment } : a
    )
    localStorage.setItem('appointments', JSON.stringify(appointments))
    set({ appointments })
  },

  deleteAppointment: (id: string) => {
    const appointments = get().appointments.filter(a => a._id !== id)
    localStorage.setItem('appointments', JSON.stringify(appointments))
    set({ appointments })
  },
}))

