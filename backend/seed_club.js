const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Club = require('./models/Club');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB Connected via Seeder.');
  
  try {
    const orgUser = await User.findOne({ email: 'org@connect.com' });
    if (!orgUser) {
      console.log('Organizer user not found.');
      process.exit(1);
    }
    
    let club = await Club.findOne({ name: 'Coding Club' });
    if (!club) {
      club = await Club.create({
        name: 'Coding Club',
        description: 'A club for coding enthusiasts to build projects and learn.',
        category: 'technical',
        organizer: orgUser._id,
        verified: true,
      });
      console.log('Test Club Created successfully!');
    } else {
      console.log('Test Club already exists. Ensuring org is assigned...');
      club.organizer = orgUser._id;
      club.verified = true;
      await club.save();
      console.log('Test Club verified and assigned!');
    }

  } catch(err) {
    console.error('Seeder Error:', err);
  } finally {
    process.exit(0);
  }
}).catch(err => {
  console.error('Initial Connection Error', err);
});
