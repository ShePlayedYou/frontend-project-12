import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../socket.js'
import { addChannel, renameChannel, removeChannel, setCurrentChannel } from '../slices/channelsSlice.js'

const useChannelsSocket = () => {
  const dispatch = useDispatch()

  const channels = useSelector(state => state.initChannels.channels)
  const curChannel = useSelector(state => state.initChannels.currentChannel)
  const [removedChannelId, setRemovedChannelId] = useState(null)

  useEffect(() => {
    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel))
    }

    const handleRenameChannel = (channel) => {
      dispatch(renameChannel(channel))
    }

    const handleRemoveChannel = (channel) => {
      dispatch(removeChannel(channel))
      setRemovedChannelId(channel.id)
    }

    const handleSocketError = (error) => {
      console.error('WebSocket error:', error)
    }

    const handleDisconnect = (reason) => {
      console.warn('Socket disconnected:', reason)
    }

    const handleReconnectFailed = () => {
      console.error('Не удалось переподключиться к серверу')
    }

    socket.on('newChannel', handleNewChannel)
    socket.on('renameChannel', handleRenameChannel)
    socket.on('removeChannel', handleRemoveChannel)
    socket.on('error', handleSocketError)
    socket.on('disconnect', handleDisconnect)
    socket.on('reconnect_failed', handleReconnectFailed)

    return () => {
      socket.off('newChannel', handleNewChannel)
      socket.on('renameChannel', handleRenameChannel)
      socket.on('removeChannel', handleRemoveChannel)
      socket.off('error', handleSocketError)
      socket.off('disconnect', handleDisconnect)
      socket.off('reconnect_failed', handleReconnectFailed)
    }
  }, [socket, dispatch])

  useEffect(() => {
    if (removedChannelId && curChannel?.id === removedChannelId) {
      const defChannel = channels[0]
      if (defChannel) {
        dispatch(setCurrentChannel(defChannel))
      }
    }
  }, [curChannel, channels, removedChannelId, dispatch])
}

export default useChannelsSocket
