import { create } from 'zustand'
import type { DoctorStore, Doctor } from '../types/index'

export const useDoctorStore = create<DoctorStore>((set) => ({
  doctor: localStorage.getItem('doctor') ? JSON.parse(localStorage.getItem('doctor') || '{}') : null,
  token: localStorage.getItem('doctorToken') || null,
  isLoading: false,

  doctorLogin: async (email: string, _password: string) => {
    set({ isLoading: true })
    try {
      // TODO: Replace with actual API call
      // For now, using mock authentication
      const mockDoctors = [
        {
          _id: '1',
          name: 'Dr. Ahmed Hassan',
          email: 'ahmed@mediconnect.com',
          specialization: 'Cardiology',
          phone: '+20 123 456 7890',
          experience: 10,
          status: 'active' as const,
          bio: 'Experienced cardiologist with 10 years of practice'
        },
        {
          _id: '2',
          name: 'Dr. Fatima Ali',
          email: 'fatima@mediconnect.com',
          specialization: 'Pediatrics',
          phone: '+20 098 765 4321',
          experience: 8,
          status: 'active' as const,
          bio: 'Specialized in child healthcare'
        },
        {
          _id: '3',
          name: 'Dr. Omar Khan',
          email: 'omar@mediconnect.com',
          specialization: 'Neurology',
          phone: '+20 111 222 3333',
          experience: 12,
          status: 'active' as const,
          bio: 'Expert in neurological disorders'
        }
      ]

      const doctor = mockDoctors.find(d => d.email === email)
      
      if (!doctor) {
        throw new Error('Doctor not found')
      }

      // Mock token generation
      const token = `doctor_token_${doctor._id}_${Date.now()}`

      localStorage.setItem('doctorToken', token)
      localStorage.setItem('doctor', JSON.stringify(doctor))
      localStorage.setItem('userRole', 'doctor')

      set({ doctor, token, isLoading: false })
    } catch (error: any) {
      set({ isLoading: false })
      throw new Error(error.message || 'Login failed')
    }
  },

  doctorLogout: () => {
    localStorage.removeItem('doctorToken')
    localStorage.removeItem('doctor')
    localStorage.removeItem('userRole')
    set({ doctor: null, token: null })
  },

  setDoctor: (doctor: Doctor) => {
    localStorage.setItem('doctor', JSON.stringify(doctor))
    set({ doctor })
  },

  setToken: (token: string) => {
    localStorage.setItem('doctorToken', token)
    set({ token })
  }
}))
