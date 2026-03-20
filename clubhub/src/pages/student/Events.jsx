import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

const allEvents = [
  { id: 1, title: 'Hackathon 2025', club: 'Coding Club', date: 'March 28', type: 'Hackathon' },
  { id: 2, title: 'Photography Walk', club: 'Photography Club', date: 'April 2', type: 'Workshop' },
  { id: 3, title: 'Debate Night', club: 'Literary Club', date: 'April 5', type: 'Competition' },
  { id: 4, title: 'Robotics Demo Day', club: 'Robotics Club', date: 'April 10', type: 'Exhibition' },
]

function Events() {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div style={{ padding: '32px' }}>
        <h2>All Events</h2>
        <p style={{ color: '#666' }}>Browse and register for upcoming events</p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
          {allEvents.map(event => (
            <div key={event.id} onClick={() => navigate(`/events/${event.id}`)}
              style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px', width: '220px', cursor: 'pointer' }}>
              <span style={{ fontSize: '12px', background: '#e8f0fe', color: '#1a73e8', padding: '2px 8px', borderRadius: '20px' }}>{event.type}</span>
              <h4 style={{ margin: '10px 0 4px' }}>{event.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{event.club}</p>
              <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#999' }}>{event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events