import Navbar from '../../components/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const eventData = {
  1: { title: 'Hackathon 2025', club: 'Coding Club', date: 'March 28', type: 'Hackathon', teamSize: '2-4', description: 'A 24-hour hackathon open to all students. Build something amazing and win exciting prizes.' },
  2: { title: 'Photography Walk', club: 'Photography Club', date: 'April 2', type: 'Workshop', teamSize: 'Solo', description: 'Join us for a campus photography walk followed by an editing session.' },
}

function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = eventData[id]
  const [registered, setRegistered] = useState(false)

  if (!event) return <div>Event not found</div>

  return (
    <div>
      <Navbar />
      <div style={{ padding: '32px', maxWidth: '700px' }}>
        <button onClick={() => navigate('/events')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', marginBottom: '16px' }}>← Back to events</button>
        <span style={{ fontSize: '12px', background: '#e8f0fe', color: '#1a73e8', padding: '3px 10px', borderRadius: '20px' }}>{event.type}</span>
        <h2 style={{ marginTop: '10px' }}>{event.title}</h2>
        <p style={{ color: '#666' }}>by {event.club}</p>
        <p style={{ color: '#444', lineHeight: '1.6' }}>{event.description}</p>
        <p style={{ fontSize: '14px' }}>Date: <strong>{event.date}</strong></p>
        <p style={{ fontSize: '14px' }}>Team size: <strong>{event.teamSize}</strong></p>
        <button
          onClick={() => setRegistered(!registered)}
          style={{ marginTop: '8px', padding: '10px 24px', background: registered ? '#e0e0e0' : '#1a73e8', color: registered ? '#333' : '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {registered ? 'Registered ✓' : 'Register for Event'}
        </button>
      </div>
    </div>
  )
}

export default EventDetail