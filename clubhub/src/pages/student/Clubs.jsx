import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

const allClubs = [
  { id: 1, name: 'Coding Club', category: 'Technical', members: 120 },
  { id: 2, name: 'Photography Club', category: 'Cultural', members: 85 },
  { id: 3, name: 'Robotics Club', category: 'Technical', members: 60 },
  { id: 4, name: 'Literary Club', category: 'Cultural', members: 95 },
  { id: 5, name: 'Sports Club', category: 'Sports', members: 200 },
]

function Clubs() {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div style={{ padding: '32px' }}>
        <h2>Explore Clubs</h2>
        <p style={{ color: '#666' }}>Discover and follow clubs that match your interests</p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
          {allClubs.map(club => (
            <div key={club.id} onClick={() => navigate(`/clubs/${club.id}`)}
              style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px', width: '200px', cursor: 'pointer' }}>
              <h4 style={{ margin: 0 }}>{club.name}</h4>
              <span style={{ fontSize: '12px', background: '#f0f0f0', padding: '2px 8px', borderRadius: '20px' }}>{club.category}</span>
              <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#888' }}>{club.members} members</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Clubs