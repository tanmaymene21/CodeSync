const { Server } = require('socket.io');

const initializeSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const participants = {};

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (data) => {
      const { roomId, username } = data;
      socket.join(roomId);
      console.log(`User ${username} (${socket.id}) joined room ${roomId}`);

      if (!participants[roomId]) {
        participants[roomId] = [];
      }
      participants[roomId].push({ socketId: socket.id, username });

      io.to(roomId).emit('participantsUpdate', participants[roomId]);
    });

    socket.on('codeChange', (data) => {
      const { roomId, code } = data;
      socket.to(roomId).emit('codeUpdate', code);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);

      for (const roomId in participants) {
        participants[roomId] = participants[roomId].filter(
          (participant) => participant.socketId !== socket.id
        );

        io.to(roomId).emit('participantsUpdate', participants[roomId]);
      }
    });
  });

  return io;
};

module.exports = initializeSockets;
