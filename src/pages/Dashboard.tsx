import './Dashboard.css'

export default function Dashboard() {
  const stats = [
    { title: 'Total Doctors', value: '24', change: '+2 this month', color: '#0066cc' },
    { title: 'Appointments', value: '156', change: '+12 this week', color: '#28a745' },
    { title: 'Reviews', value: '89', change: '+5 pending', color: '#ffc107' },
    { title: 'Patients', value: '342', change: '+28 new', color: '#17a2b8' }
  ]

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3>{stat.title}</h3>
              <div className="stat-icon" style={{ backgroundColor: stat.color }}></div>
            </div>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-change">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Recent Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. Ahmed Hassan</td>
                <td>Mohammed Ali</td>
                <td>2025-12-15</td>
                <td><span className="badge badge-success">Completed</span></td>
              </tr>
              <tr>
                <td>Dr. Fatima Ali</td>
                <td>Sara Mohamed</td>
                <td>2025-12-14</td>
                <td><span className="badge badge-info">Scheduled</span></td>
              </tr>
              <tr>
                <td>Dr. Omar Khan</td>
                <td>Aisha Ibrahim</td>
                <td>2025-12-13</td>
                <td><span className="badge badge-success">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>Top Doctors</h2>
          <div className="doctor-list">
            <div className="doctor-item">
              <div className="doctor-info">
                <h4>Dr. Ahmed Hassan</h4>
                <p>Cardiology</p>
              </div>
              <div className="rating">★★★★★ 4.9</div>
            </div>
            <div className="doctor-item">
              <div className="doctor-info">
                <h4>Dr. Fatima Ali</h4>
                <p>Pediatrics</p>
              </div>
              <div className="rating">★★★★☆ 4.7</div>
            </div>
            <div className="doctor-item">
              <div className="doctor-info">
                <h4>Dr. Omar Khan</h4>
                <p>Neurology</p>
              </div>
              <div className="rating">★★★★★ 4.8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
