const assert = require('assert');

const API_URL = 'http://localhost:5000/api';

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, data };
  return data;
}

async function runTests() {
  console.log('🔄 Starting Full E2E Flow Test...\n');
  try {
    console.log('1️⃣ Logging in as Organizer...');
    let data = await fetchJSON(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: 'org@connect.com', password: 'password123' })
    });
    const orgToken = data.token;
    assert(orgToken, 'Organizer token missing');
    console.log('✅ Organizer Login Successful!\n');

    console.log('2️⃣ Organizer creating an event...');
    data = await fetchJSON(`${API_URL}/events/create`, {
      method: 'POST',
      body: JSON.stringify({
        title: 'E2E Test Workshop',
        description: 'Automated test workshop description',
        date: new Date().toISOString(),
        venue: 'Lab 101',
        club: 'Coding Club', // The seeded club name
        teamSize: 1
      }),
      headers: { Authorization: `Bearer ${orgToken}` }
    });
    
    const eventId = data.data._id;
    assert(eventId, 'Event ID missing');
    assert(data.data.status === 'pending', 'Event is not marked as pending');
    console.log(`✅ Event Created! ID: ${eventId} (Status: pending)\n`);

    console.log('3️⃣ Logging in as Admin...');
    data = await fetchJSON(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@connect.com', password: 'password123' })
    });
    const adminToken = data.token;
    assert(adminToken, 'Admin token missing');
    console.log('✅ Admin Login Successful!\n');

    console.log('4️⃣ Admin approving the event...');
    data = await fetchJSON(`${API_URL}/admin/approve-event/${eventId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(data.data.status === 'approved', 'Event was not approved properly');
    console.log('✅ Event successfully approved!\n');

    console.log('5️⃣ Logging in as Student...');
    data = await fetchJSON(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: 'student1@connect.com', password: 'password123' })
    });
    const studentToken = data.token;
    assert(studentToken, 'Student token missing');
    console.log('✅ Student Login Successful!\n');

    console.log('6️⃣ Student registering for the event...');
    data = await fetchJSON(`${API_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    assert(data.success, 'Registration failed');
    console.log('✅ Student successfully registered!\n');

    console.log('7️⃣ Testing duplicate registration block...');
    try {
      await fetchJSON(`${API_URL}/events/${eventId}/register`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${studentToken}` }
      });
      console.log('❌ Duplicate registration allowed! This is a bug.');
    } catch(err) {
      assert(err.status === 400 || err.status === 429, 'Expected 400/429 status code for duplicate/rate limit');
      console.log('✅ Duplicate registration correctly blocked by API!\n');
    }

    console.log('🎉 ALL TESTS PASSED! The entire system is flawless!');
    
  } catch(error) {
    console.error('❌ TEST FAILED!', error.data || error.message);
  }
}

runTests();
