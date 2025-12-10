import { useState } from 'react'
import { FiTrash2, FiSearch } from 'react-icons/fi'
import '../styles/pages.css'

interface Review {
  id: string
  doctorName: string
  patientName: string
  rating: number
  comment: string
  date: string
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      doctorName: 'Dr. Ahmed Hassan',
      patientName: 'Mohammed Ali',
      rating: 5,
      comment: 'Excellent doctor, very professional and caring',
      date: '2025-12-10'
    },
    {
      id: '2',
      doctorName: 'Dr. Fatima Ali',
      patientName: 'Sara Mohamed',
      rating: 4,
      comment: 'Good service, highly recommended',
      date: '2025-12-09'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReviews = reviews.filter(
    (review) =>
      review.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id))
  }

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? '#ffc107' : '#ddd' }}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Reviews Management</h2>
      </div>

      <div className="search-box">
        <FiSearch />
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="reviews-container">
        {filteredReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div>
                <h4>{review.doctorName}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  by {review.patientName}
                </p>
              </div>
              <button
                className="btn-icon btn-danger"
                onClick={() => handleDelete(review.id)}
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="review-rating">
              {renderStars(review.rating)}
            </div>
            <p className="review-comment">{review.comment}</p>
            <p style={{ fontSize: '0.85rem', color: '#999' }}>
              {review.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
