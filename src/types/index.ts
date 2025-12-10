// Doctor types
export interface Doctor {
  _id?: string
  name: string
  specialization: string
  email: string
  phone: string
  experience: number
  qualifications?: string[]
  status: 'active' | 'inactive'
  bio?: string
  profileImage?: string
  createdAt?: string
  updatedAt?: string
}

// Doctor with authentication
export interface DoctorAuth extends Doctor {
  password?: string
}

// Appointment types
export interface Appointment {
  _id?: string
  doctorId: string
  doctorName: string
  patientName: string
  patientEmail: string
  patientPhone: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  createdAt?: string
  updatedAt?: string
}

// Review types
export interface Review {
  _id?: string
  doctorId: string
  doctorName: string
  patientName: string
  rating: number
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt?: string
  updatedAt?: string
}

// Admin/Auth types
export interface Admin {
  _id?: string
  username: string
  email: string
  role: 'admin' | 'super_admin'
  isActive: boolean
  lastLogin?: string
  createdAt?: string
  updatedAt?: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  count?: number
  status?: number
}

// Auth Response types
export interface AuthResponse {
  user: Doctor | Admin
  token: string
  role: 'doctor' | 'admin'
}

// User Store types
export interface UserStore {
  user: Admin | null
  token: string | null
  isLoading: boolean
  doctors: Doctor[]
  appointments: Appointment[]
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: Admin) => void
  setToken: (token: string) => void
  addDoctor: (doctor: Doctor) => void
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void
  deleteDoctor: (id: string) => void
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
}

// Doctor Store types
export interface DoctorStore {
  doctor: Doctor | null
  token: string | null
  isLoading: boolean
  doctorLogin: (email: string, password: string) => Promise<void>
  doctorLogout: () => void
  setDoctor: (doctor: Doctor) => void
  setToken: (token: string) => void
}
