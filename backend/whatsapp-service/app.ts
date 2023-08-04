const io = require('socket.io-client');

// Connect to the server (replace with your server's URL)
const socket = io('http://localhost:3000');

// Listen for 'qr' events
socket.on('qr', (data) => {
    console.log('Received QR code for session:', data.sessionId);
    console.log('QR code:', data.qr);

    // Display the QR code to the user
    // This depends on your frontend. For instance, if you're using a terminal, you could just print it:
    console.log('Please scan this QR code with WhatsApp:', data.qr);
});

socket.on('message', (data) => {
    console.log("FROM:", data.from);
    console.log("message:", data.message);
});


socket.on('connect', () => {
    console.log('Successfully connected to the server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});