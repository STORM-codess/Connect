const http = require('http');

const users = [
  { name: 'Admin User', email: 'admin@connect.com', password: 'Password123', role: 'admin' },
  { name: 'Organizer User', email: 'org@connect.com', password: 'Password123', role: 'organizer' },
  { name: 'Student User', email: 'student@connect.com', password: 'Password123', role: 'student' }
];

users.forEach(user => {
  const data = JSON.stringify(user);
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, res => {
    res.on('data', d => process.stdout.write(d));
  });

  req.on('error', error => console.error(error));
  req.write(data);
  req.end();
});
