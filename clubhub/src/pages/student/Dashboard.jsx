import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

const upcomingEvents = [
  { id: 1, title: 'Hackathon 2025', club: 'Coding Club', date: 'March 28' },
  { id: 2, title: 'Photography Walk', club: 'Photography Club', date: 'April 2' },
  { id: 3, title: 'Debate Night', club: 'Literary Club', date: 'April 5' },
]

const followedClubs = [
  { id: 1, name: 'Coding Club', category: 'Technical' },
  { id: 2, name: 'Photography Club', category: 'Cultural' },
]

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div style={{ padding: '32px' }}>
        <h2>Welcome back, Rahul 👋</h2>
        <p style={{ color: '#666' }}>Here's what's happening around campus</p>

        <h3 style={{ marginTop: '32px' }}>Upcoming Events</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {upcomingEvents.map(event => (
            <div key={event.id} onClick={() => navigate(`/events/${event.id}`)}
              style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', width: '220px', cursor: 'pointer' }}>
              <h4 style={{ margin: 0 }}>{event.title}</h4>
              <p style={{ margin: '6px 0', color: '#666', fontSize: '14px' }}>{event.club}</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#999' }}>{event.date}</p>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: '32px' }}>Clubs You Follow</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {followedClubs.map(club => (
            <div key={club.id} onClick={() => navigate(`/clubs/${club.id}`)}
              style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px', width: '180px', cursor: 'pointer' }}>
              <h4 style={{ margin: 0 }}>{club.name}</h4>
              <p style={{ margin: '6px 0', fontSize: '13px', color: '#888' }}>{club.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard