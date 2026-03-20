import Navbar from '../../components/Navbar'

const student = {
  name: 'Rahul Sharma',
  email: 'rahul@college.edu',
  branch: 'CSE',
  year: '2nd Year',
  enrollNo: 'CS2023001',
  clubs: ['Coding Club', 'Photography Club'],
  events: ['Hackathon 2025', 'Photography Walk'],
}

function Profile() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '32px', maxWidth: '600px' }}>
        <h2>My Profile</h2>

        <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', marginTop: '16px' }}>
          <h3 style={{ margin: '0 0 16px' }}>{student.name}</h3>
          <p style={{ margin: '6px 0', color: '#555' }}>Email: {student.email}</p>
          <p style={{ margin: '6px 0', color: '#555' }}>Branch: {student.branch}</p>
          <p style={{ margin: '6px 0', color: '#555' }}>Year: {student.year}</p>
          <p style={{ margin: '6px 0', color: '#555' }}>Enrollment No: {student.enrollNo}</p>
        </div>

        <h3 style={{ marginTop: '28px' }}>Clubs Joined</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {student.clubs.map((club, i) => (
            <span key={i} style={{ background: '#e8f0fe', color: '#1a73e8', padding: '6px 14px', borderRadius: '20px', fontSize: '14px' }}>{club}</span>
          ))}
        </div>

        <h3 style={{ marginTop: '28px' }}>Events Attended</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {student.events.map((event, i) => (
            <span key={i} style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 14px', borderRadius: '20px', fontSize: '14px' }}>{event}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile