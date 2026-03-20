import Navbar from '../../components/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const clubData = {
  1: { name: 'Coding Club', category: 'Technical', members: 120, description: 'A club for developers, hackers, and tech enthusiasts. We organize hackathons, workshops, and coding contests throughout the year.' },
  2: { name: 'Photography Club', category: 'Cultural', members: 85, description: 'Explore the art of photography. We go on photo walks, conduct editing workshops, and run monthly contests.' },
}

function ClubDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const club = clubData[id]
  const [followed, setFollowed] = useState(false)

  if (!club) return <div>Club not found</div>

  return (
    <div>
      <Navbar />
      <div style={{ padding: '32px', maxWidth: '700px' }}>
        <button onClick={() => navigate('/clubs')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', marginBottom: '16px' }}>← Back to clubs</button>
        <h2>{club.name}</h2>
        <span style={{ fontSize: '13px', background: '#f0f0f0', padding: '3px 10px', borderRadius: '20px' }}>{club.category}</span>
        <p style={{ marginTop: '16px', color: '#444', lineHeight: '1.6' }}>{club.description}</p>
        <p style={{ color: '#888', fontSize: '14px' }}>{club.members} members</p>
        <button
          onClick={() => setFollowed(!followed)}
          style={{ marginTop: '8px', padding: '10px 24px', background: followed ? '#e0e0e0' : '#1a73e8', color: followed ? '#333' : '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {followed ? 'Following' : 'Follow Club'}
        </button>
      </div>
    </div>
  )
}

export default ClubDetail