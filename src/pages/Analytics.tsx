import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './Pages.css'

const appointmentData = [
  { month: 'Jan', appointments: 40 },
  { month: 'Feb', appointments: 45 },
  { month: 'Mar', appointments: 50 },
  { month: 'Apr', appointments: 55 },
  { month: 'May', appointments: 65 },
  { month: 'Jun', appointments: 75 }
]

const doctorPerformance = [
  { name: 'Dr. Ahmed', patients: 120 },
  { name: 'Dr. Fatima', patients: 95 },
  { name: 'Dr. Omar', patients: 110 },
  { name: 'Dr. Leila', patients: 85 }
]

const appointmentStatus = [
  { name: 'Completed', value: 310, color: '#28a745' },
  { name: 'Scheduled', value: 45, color: '#0066cc' },
  { name: 'Cancelled', value: 21, color: '#dc3545' }
]

export default function Analytics() {
  return (
    <div className="page">
      <h1>Analytics Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Appointments</h4>
          <p className="stat-value">376</p>
          <p className="stat-change positive">+12% from last month</p>
        </div>
        <div className="stat-card">
          <h4>Total Doctors</h4>
          <p className="stat-value">24</p>
          <p className="stat-change">Active doctors</p>
        </div>
        <div className="stat-card">
          <h4>Patient Satisfaction</h4>
          <p className="stat-value">4.7★</p>
          <p className="stat-change positive">+0.2 from last month</p>
        </div>
        <div className="stat-card">
          <h4>Completion Rate</h4>
          <p className="stat-value">93.6%</p>
          <p className="stat-change positive">+2% from last month</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Appointments Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="appointments" stroke="#0066cc" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Appointment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card full-width">
        <h3>Doctor Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={doctorPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
