const mongoose = require('mongoose');
const dns = require('dns');

// Force IPv4 and use Google DNS to fix ECONNREFUSED on restricted networks
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.error('\n🔧 Network issue detected. Try one of these:');
      console.error('   1. Switch to mobile hotspot and restart');
      console.error('   2. Use local MongoDB — change .env to:');
      console.error('      MONGO_URI=mongodb://localhost:27017/connectdb\n');
    }

    if (error.message.includes('Authentication') || error.message.includes('bad auth')) {
      console.error('\n🔧 Wrong username or password in MONGO_URI\n');
    }

    process.exit(1);
  }
};

module.exports = connectDB;
