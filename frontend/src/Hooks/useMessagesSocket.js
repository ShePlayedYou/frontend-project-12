import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSocket } from '../contexts/SocketContext.jsx'
import { addMessage } from '../slices/messagesSlice.js';

const useMessagesSocket = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      dispatch(addMessage(msg));
    };

    const handleSocketError = (error) => {
      console.error('WebSocket error:', error);
    };

    const handleDisconnect = (reason) => {
      console.warn('Socket disconnected:', reason);
    };

    const handleReconnectFailed = () => {
      console.error('Не удалось переподключиться к серверу');
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('error', handleSocketError);
    socket.on('disconnect', handleDisconnect);
    socket.on('reconnect_failed', handleReconnectFailed);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('error', handleSocketError);
      socket.off('disconnect', handleDisconnect);
      socket.off('reconnect_failed', handleReconnectFailed);
    };
  }, [socket, dispatch]);
};

export default useMessagesSocket;