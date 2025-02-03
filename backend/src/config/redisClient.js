const { createClient } = require('@redis/client'); // Sử dụng client từ package mới
const client = createClient({
  url: 'redis://localhost:6379', // Hoặc thông tin kết nối Redis của bạn
});

client.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.error('Error connecting to Redis:', err);
  });

module.exports = client;