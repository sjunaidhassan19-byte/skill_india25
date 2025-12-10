import { useState } from 'react'
import { FiTrash2, FiSearch } from 'react-icons/fi'
import './Pages.css'

export default function Reviews() {
  const [reviews] = useState([
    { id: 1, doctor: 'Dr. Ahmed Hassan', patient: 'Mohammed Ali', rating: 5, comment: 'Excellent doctor, very professional', date: '2025-12-10' },
    { id: 2, doctor: 'Dr. Fatima Ali', patient: 'Sara Mohamed', rating: 4, comment: 'Good service, highly recommended', date: '2025-12-09' },
    { id: 3, doctor: 'Dr. Omar Khan', patient: 'Aisha Ibrahim', rating: 5, comment: 'Amazing treatment and care', date: '2025-12-08' },
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReviews = reviews.filter(review =>
    review.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.patient.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderStars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(5 - rating)

  return (
    <div className="page">
      <h1>Reviews Management</h1>

      <div className="search-bar">
        <FiSearch />
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="reviews-grid">
        {filteredReviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div>
                <h3>{review.doctor}</h3>
                <p>{review.patient}</p>
              </div>
              <button className="btn btn-sm btn-danger"><FiTrash2 /></button>
            </div>
            <div className="review-rating">{renderStars(review.rating)} {review.rating}/5</div>
            <p className="review-comment">{review.comment}</p>
            <p className="review-date">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
